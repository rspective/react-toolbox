import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { themr } from '@friendsofreactjs/react-css-themr';
import { MENU } from '../identifiers';
import { events, mod, getViewport } from '../utils';
import InjectMenuItem from './MenuItem';
import KEYS from '../utils/keymap';


const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const POSITION = {
  AUTO: 'auto',
  STATIC: 'static',
  TOP_LEFT: 'topLeft',
  TOP_RIGHT: 'topRight',
  BOTTOM_LEFT: 'bottomLeft',
  BOTTOM_RIGHT: 'bottomRight',
};

const factory = (MenuItem) => {
  class Menu extends Component {
    static propTypes = {
      active: PropTypes.bool,
      children: PropTypes.node,
      className: PropTypes.string,
      focusable: PropTypes.bool,
      onHide: PropTypes.func,
      onSelect: PropTypes.func,
      onShow: PropTypes.func,
      outline: PropTypes.bool,
      position: PropTypes.oneOf(Object.keys(POSITION).map(key => POSITION[key])),
      ripple: PropTypes.bool,
      selectable: PropTypes.bool,
      selected: PropTypes.node,
      theme: PropTypes.shape({
        active: PropTypes.string,
        bottomLeft: PropTypes.string,
        bottomRight: PropTypes.string,
        menu: PropTypes.string,
        menuInner: PropTypes.string,
        outline: PropTypes.string,
        rippled: PropTypes.string,
        static: PropTypes.string,
        topLeft: PropTypes.string,
        topRight: PropTypes.string,
        itemWrapper: PropTypes.string,
      }),
    };

    static defaultProps = {
      active: false,
      focusable: true,
      outline: true,
      position: POSITION.STATIC,
      ripple: true,
      selectable: true,
    };

    state = {
      active: this.props.active,
      rippled: false,
      focusedItemIndex: undefined,
    };

    componentDidMount() {
      this.positionTimeoutHandle = setTimeout(() => {
        const { width, height } = this.menuNode.getBoundingClientRect();
        const position = this.props.position === POSITION.AUTO
          ? this.calculatePosition()
          : this.props.position;
        this.setState({ position, width, height });
      });
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(nextProps) {
      if (this.props.position !== nextProps.position) {
        const position = nextProps.position === POSITION.AUTO
          ? this.calculatePosition()
          : nextProps.position;
        this.setState({ position });
      }

      /**
       * If the menu is going to be activated via props and its not active, verify
       * the position is appropriated and then show it recalculating position if its
       * wrong. It should be shown in two consecutive setState.
       */
      if (!this.props.active && nextProps.active && !this.state.active) {
        if (nextProps.position === POSITION.AUTO) {
          const position = this.calculatePosition();
          if (this.state.position !== position) {
            this.setState({ position, active: false }, () => {
              this.activateTimeoutHandle = setTimeout(() => { this.show(); }, 20);
            });
          } else {
            this.show();
          }
        } else {
          this.show();
        }
      }

      /**
       * If the menu is being deactivated via props and the current state is
       * active, it should be hid.
       */
      if (this.props.active && !nextProps.active && this.state.active) {
        this.hide();
      }
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillUpdate(nextProps, nextState) {
      if (!this.state.active && nextState.active) {
        events.addEventsToDocument({
          click: this.handleDocumentClick,
          touchstart: this.handleDocumentClick,
        });
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.active && !this.state.active) {
        if (this.props.onHide) this.props.onHide();
        events.removeEventsFromDocument({
          click: this.handleDocumentClick,
          touchstart: this.handleDocumentClick,
        });
      } else if (!prevState.active && this.state.active && this.props.onShow) {
        this.props.onShow();
      }
    }

    componentWillUnmount() {
      if (this.state.active) {
        events.removeEventsFromDocument({
          click: this.handleDocumentClick,
          touchstart: this.handleDocumentClick,
        });
      }
      clearTimeout(this.positionTimeoutHandle);
      clearTimeout(this.activateTimeoutHandle);
    }

    getMenuStyle() {
      const { width, height, position } = this.state;
      if (position !== POSITION.STATIC) {
        if (this.state.active) {
          return { clip: `rect(0 ${width}px ${height}px 0)` };
        } else if (position === POSITION.TOP_RIGHT) {
          return { clip: `rect(0 ${width}px 0 ${width}px)` };
        } else if (position === POSITION.BOTTOM_RIGHT) {
          return { clip: `rect(${height}px ${width}px ${height}px ${width}px)` };
        } else if (position === POSITION.BOTTOM_LEFT) {
          return { clip: `rect(${height}px 0 ${height}px 0)` };
        } else if (position === POSITION.TOP_LEFT) {
          return { clip: 'rect(0 0 0 0)' };
        }
      }

      return undefined;
    }

    getRootStyle() {
      return this.state.position !== POSITION.STATIC
        ? { width: this.state.width, height: this.state.height }
        : undefined;
    }

    getNextSelectableItemIndex = (focusedItemIndex) => {
      const children = Array.from(this.menuNode.children);
      let nextIndex = focusedItemIndex;
      do {
        nextIndex = mod(nextIndex + 1, children.length);
      } while (children[nextIndex] &&
        (children[nextIndex].disabled || children[nextIndex].childElementCount === 0) &&
        nextIndex !== focusedItemIndex
      );

      return nextIndex;
    };

    getPreviousSelectableItemIndex = (focusedItemIndex) => {
      const children = Array.from(this.menuNode.children);

      let previousIndex = focusedItemIndex;
      do {
        previousIndex = mod(previousIndex - 1, children.length);
      } while (children[previousIndex] &&
        (children[previousIndex].disabled || children[previousIndex].childElementCount === 0) &&
        previousIndex !== focusedItemIndex
      );

      return previousIndex;
    };

    setFocusOnMouseMove = debounce((event) => {
      const { focusable } = this.props;
      if (!focusable) {
        return;
      }
      const indexOfHoveredItem = Array.from(this.menuNode.children)
        .findIndex(element => this.isDescendant(element, event.target));
      if (indexOfHoveredItem === -1 || indexOfHoveredItem === this.state.focusedItemIndex) {
        return;
      }
      this.setState({
        focusedItemIndex: indexOfHoveredItem,
      });

      this.menuNode.children[indexOfHoveredItem].focus();
    }, 10);

    isDescendant = (parent, child) => {
      if (parent === child) {
        return true;
      }
      let node = child.parentNode;
      while (node != null) {
        if (node === parent) {
          return true;
        }
        node = node.parentNode;
      }
      return false;
    }

    handleMouseMove = (event) => {
      event.persist();
      this.setFocusOnMouseMove(event);
    };

    handleItemKeyDown = (item, event) => {
      const { focusable } = this.props;
      const childrenElements = Array.from(this.menuNode.children);

      if (!focusable || childrenElements.length === 0) {
        return;
      }

      const charCode = event.which || event.keyCode;
      if (charCode === KEYS.ENTER || charCode === KEYS.SPACE) {
        this.handleSelect(item, event);
        event.preventDefault();
        event.stopPropagation();
      }
    };

    handleKeyDown = (event) => {
      const { focusable } = this.props;
      const childrenElements = Array.from(this.menuNode.children);

      if (!focusable || childrenElements.length === 0) {
        return;
      }
      const { focusedItemIndex } = this.state;
      const nextItemIndex = this.getNextSelectableItemIndex(focusedItemIndex || 0);
      const previousItemIndex = this.getPreviousSelectableItemIndex(focusedItemIndex || 0);

      const charCode = event.which || event.keyCode;
      let newFocusedItemIndex;

      switch (charCode) {
        case KEYS.UP_ARROW:
          newFocusedItemIndex = previousItemIndex;
          break;
        case KEYS.DOWN_ARROW:
          newFocusedItemIndex = nextItemIndex;
          break;
        case KEYS.LEFT_ARROW:
        case KEYS.RIGHT_ARROW:
          event.preventDefault();
          event.stopPropagation();
          break;
        case KEYS.TAB:
          this.hide();
          break;
        default: return;
      }

      if (newFocusedItemIndex || newFocusedItemIndex === 0) {
        event.preventDefault();
        event.stopPropagation();
        this.menuNode.children[newFocusedItemIndex].focus();
        this.setState({ focusedItemIndex: newFocusedItemIndex });
      }
    };

    calculatePosition() {
      const parentNode = ReactDOM.findDOMNode(this).parentNode;
      if (!parentNode) return undefined;
      const { top, left, height, width } = parentNode.getBoundingClientRect();
      const { height: wh, width: ww } = getViewport();
      const toTop = top < ((wh / 2) - (height / 2));
      const toLeft = left < ((ww / 2) - (width / 2));
      return `${toTop ? 'top' : 'bottom'}${toLeft ? 'Left' : 'Right'}`;
    }

    handleDocumentClick = (event) => {
      if (this.state.active && !events.targetIsDescendant(event, ReactDOM.findDOMNode(this))) {
        this.setState({ active: false, rippled: false });
      }
    };

    handleSelect = (item, event) => {
      const { value, onClick } = item.props;
      if (onClick) event.persist();
      this.setState({ active: false, rippled: this.props.ripple }, () => {
        if (onClick) onClick(event);
        if (this.props.onSelect) this.props.onSelect(value);
      });
    };

    show() {
      const { width, height } = this.menuNode.getBoundingClientRect();
      const { focusable } = this.props;
      const children = Array.from(this.menuNode.children);

      this.setState({ active: true, width, height });
      if (focusable && children.length !== 0) {
        this.menuNode.children[this.getNextSelectableItemIndex(-1)].focus();
      }
    }

    hide() {
      this.setState({ active: false });
    }

    renderItems() {
      const { theme } = this.props;

      return React.Children.map(this.props.children, (item) => {
        if (!item) return item;
        if (item.type === MenuItem) {
          return React.cloneElement(item, {
            ripple: item.props.ripple || this.props.ripple,
            selected: typeof item.props.value !== 'undefined'
              && this.props.selectable
              && item.props.value === this.props.selected,
            onClick: this.handleSelect.bind(this, item),
            onMouseMove: this.handleMouseMove,
            onKeyDown: this.handleItemKeyDown.bind(this, item),
          });
        }
        return (<div onMouseMove={this.handleMouseMove} tabIndex={-1} className={theme.itemWrapper}>
          {React.cloneElement(item, {
            onMouseMove: this.handleMouseMove,
          })}
        </div>);
      });
    }

    render() {
      const { theme } = this.props;
      const outlineStyle = { width: this.state.width, height: this.state.height };
      const className = classnames([theme.menu, theme[this.state.position]], {
        [theme.active]: this.state.active,
        [theme.rippled]: this.state.rippled,
      }, this.props.className);

      return (
        <div data-react-toolbox="menu" className={className} style={this.getRootStyle()}>
          {this.props.outline ? <div className={theme.outline} style={outlineStyle} /> : null}
          <ul
            ref={(node) => { this.menuNode = node; }}
            className={theme.menuInner}
            style={this.getMenuStyle()}
            onKeyDown={this.handleKeyDown}
            tabIndex="-1"
          >
            {this.renderItems()}
          </ul>
        </div>
      );
    }
  }

  return Menu;
};

const Menu = factory(InjectMenuItem);
export default themr(MENU)(Menu);
export { factory as menuFactory };
export { Menu };
