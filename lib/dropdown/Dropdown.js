'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dropdown = exports.dropdownFactory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _classnames4 = require('classnames');

var _classnames5 = _interopRequireDefault(_classnames4);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers');

var _Input = require('../input/Input');

var _Input2 = _interopRequireDefault(_Input);

var _events = require('../utils/events');

var _events2 = _interopRequireDefault(_events);

var _contains = require('dom-helpers/query/contains');

var _contains2 = _interopRequireDefault(_contains);

var _activeElement = require('dom-helpers/activeElement');

var _activeElement2 = _interopRequireDefault(_activeElement);

var _ownerDocument = require('dom-helpers/ownerDocument');

var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

var _keymap = require('../utils/keymap');

var _keymap2 = _interopRequireDefault(_keymap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable */


var factory = function factory(Input) {
  var Dropdown = function (_Component) {
    _inherits(Dropdown, _Component);

    function Dropdown() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Dropdown);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        active: false,
        up: false,
        focusedItemIndex: undefined
      }, _this.itemsContainer = null, _this.getDocumentEvents = function () {
        return {
          click: _this.handleDocumentClick,
          touchend: _this.handleDocumentClick
        };
      }, _this.getSelectedItem = function () {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _this.props.source[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            if (item[_this.props.valueKey] === _this.props.value) return item;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return !_this.props.allowBlank ? _this.props.source[0] : undefined;
      }, _this.getNextSelectableItemIndex = function (focusedItemIndex) {
        var source = _this.props.source;

        var lastItemIndex = source.length - 1;

        var nextIndex = focusedItemIndex !== lastItemIndex ? focusedItemIndex + 1 : 0;

        // If the next item is disabled then keep going until we either find a non-disabled item or we get back to the
        // original focused item
        while (source[nextIndex] && source[nextIndex].disabled && nextIndex !== focusedItemIndex) {
          nextIndex = nextIndex !== lastItemIndex ? nextIndex + 1 : 0;
        }

        return nextIndex;
      }, _this.getPreviousSelectableItemIndex = function (focusedItemIndex) {
        var source = _this.props.source;

        var lastItemIndex = source.length - 1;

        // Set the previous index
        var previousIndex = focusedItemIndex !== 0 ? focusedItemIndex - 1 : lastItemIndex;

        // If the previous item is disabled then keep going until we either find a non-disabled item or we get back to the
        // original focused item
        while (source[previousIndex] && source[previousIndex].disabled && previousIndex !== focusedItemIndex) {
          previousIndex = previousIndex !== 0 ? previousIndex - 1 : lastItemIndex;
        }

        return previousIndex;
      }, _this.handleSelect = function (item, event) {
        if (_this.props.onBlur) _this.props.onBlur(event);
        if (!_this.props.disabled && _this.props.onChange) {
          if (_this.props.name) event.target.name = _this.props.name;
          _this.props.onChange(item, event);
          _this.close();
        }
      }, _this.handleKeyDown = function (event) {
        var _this$props = _this.props,
            source = _this$props.source,
            valueKey = _this$props.valueKey;
        var focusedItemIndex = _this.state.focusedItemIndex;


        if (source.filter(function (elem) {
          return !elem.disabled;
        }) === 0) {
          return;
        }
        var currentItem = source[focusedItemIndex || 0];
        var nextItemIndex = _this.getNextSelectableItemIndex(focusedItemIndex || 0);
        var previousItemIndex = _this.getPreviousSelectableItemIndex(focusedItemIndex || 0);

        var charCode = event.which || event.keyCode;
        var newFocusedItemIndex = void 0;

        switch (charCode) {
          case _keymap2.default.UP_ARROW:
            newFocusedItemIndex = previousItemIndex;
            break;
          case _keymap2.default.DOWN_ARROW:
            newFocusedItemIndex = nextItemIndex;
            break;
          case _keymap2.default.RIGHT_ARROW:
          case _keymap2.default.LEFT_ARROW:
            event.preventDefault();
            event.stopPropagation();
            return;
          case _keymap2.default.ENTER:
          case _keymap2.default.SPACE:
            event.preventDefault();
            event.stopPropagation();
            !currentItem.disabled && _this.handleSelect(currentItem[valueKey]);

            break;
        }

        // If we are just shifting focus between list items, update the focus ourselves and prevent propagation of the event
        if (newFocusedItemIndex || newFocusedItemIndex === 0) {
          event.preventDefault();
          event.stopPropagation();
          _this.itemsContainer.children[newFocusedItemIndex].focus();
          return false;
        }
      }, _this.handleClick = function (event) {
        _this.open(event);
        _events2.default.pauseEvent(event);
        if (_this.props.onClick) _this.props.onClick(event);
      }, _this.handleDocumentClick = function (event) {
        if (_this.state.active && !_events2.default.targetIsDescendant(event, (0, _reactDom.findDOMNode)(_this))) {
          _this.setState({ active: false });
        }
      }, _this.close = function () {
        if (_this.state.active) {
          _this.setState({ active: false });
        }
      }, _this.open = function (event) {
        if (_this.state.active) return;
        var client = event.target.getBoundingClientRect();
        var screenHeight = window.innerHeight || document.documentElement.offsetHeight;
        var up = _this.props.auto ? client.top > screenHeight / 2 + client.height : false;
        _this.setState({ active: true, up: up });
      }, _this.handleFocus = function (event) {
        event.stopPropagation();
        var source = _this.props.source;
        var focusedItemIndex = _this.state.focusedItemIndex;


        if (!_this.itemsContainer || !_this.itemsContainer.children) {
          return;
        }

        var firstFocusableItem = focusedItemIndex || 0;
        // We can't assume the first item should be selected by default since it might be disabled
        if (source && source[firstFocusableItem].disabled) {
          firstFocusableItem = _this.getNextSelectableItemIndex(firstFocusableItem);
        }

        // Need a setTimeout here because a parent item is stealing the focus immediately after this method is invoked
        setTimeout(function () {
          _this.itemsContainer.children[firstFocusableItem].focus();
        }, 30);

        if (!_this.props.disabled) _this.open(event);
        if (_this.props.onFocus) _this.props.onFocus(event);
      }, _this.handleBlur = function (event) {
        event.stopPropagation();

        // Using setTimeout here because blur might be called before we set a focused list item (ex. when we first
        // open the menu, we call focus on the first item in the list, blur on this item will be called before the
        // actual focus on the item is set.)
        setTimeout(function () {
          if (_this.itemsContainer) {
            // Grab the current focused element
            var currentFocusedItem = (0, _activeElement2.default)((0, _ownerDocument2.default)(_this.itemsContainer));
            // Check to see if the focused element is part of the menu -- in which case we don't want to close the menu.
            if (!(0, _contains2.default)(_this.itemsContainer, currentFocusedItem)) {
              // Reset the focused item index before we close the menu so if the menu is opened again, we start fresh.
              _this.setState({
                focusedItemIndex: undefined
              });

              if (_this.state.active) _this.close();
              if (_this.props.onBlur) _this.props.onBlur(event);
            }
          }
        }, 30);
      }, _this.setFocusedItemIndex = function (idx, event) {
        // Stop propagation so that the higher-level focus handler doesn't kick in (only used for initial focus)
        event.stopPropagation();
        if (idx === _this.state.focusedItemIndex) {
          return;
        }
        _this.setState({
          focusedItemIndex: idx
        });
      }, _this.renderValue = function (item, idx) {
        var _classnames;

        var _this$props2 = _this.props,
            labelKey = _this$props2.labelKey,
            theme = _this$props2.theme,
            valueKey = _this$props2.valueKey;
        var focusedItemIndex = _this.state.focusedItemIndex;

        var className = (0, _classnames5.default)((_classnames = {}, _defineProperty(_classnames, theme.selected, item[valueKey] === _this.props.value), _defineProperty(_classnames, theme.focused, idx === focusedItemIndex), _defineProperty(_classnames, theme.disabled, item.disabled), _classnames));
        return _react2.default.createElement(
          'li',
          {
            key: idx,
            className: className,
            onClick: !item.disabled ? _this.handleSelect.bind(_this, item[valueKey]) : function () {},
            tabIndex: focusedItemIndex === idx ? 0 : -1,
            onFocus: _this.setFocusedItemIndex.bind(_this, idx),
            onMouseMove: _this.setFocusedItemIndex.bind(_this, idx)
          },
          _this.props.template ? _this.props.template(item) : item[labelKey]
        );
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    /**
     * @type HTMLUListElement
     */


    _createClass(Dropdown, [{
      key: 'UNSAFE_componentWillUpdate',


      // eslint-disable-next-line camelcase
      value: function UNSAFE_componentWillUpdate(nextProps, nextState) {
        if (!this.state.active && nextState.active) {
          _events2.default.addEventsToDocument(this.getDocumentEvents());
        }
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps, prevState) {
        if (prevState.active && !this.state.active) {
          _events2.default.removeEventsFromDocument(this.getDocumentEvents());
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.state.active) {
          _events2.default.removeEventsFromDocument(this.getDocumentEvents());
        }
      }
    }, {
      key: 'renderTemplateValue',
      value: function renderTemplateValue(selected) {
        var _classnames2;

        var theme = this.props.theme;

        var className = (0, _classnames5.default)(theme.field, (_classnames2 = {}, _defineProperty(_classnames2, theme.errored, this.props.error), _defineProperty(_classnames2, theme.disabled, this.props.disabled), _defineProperty(_classnames2, theme.required, this.props.required), _classnames2));

        return _react2.default.createElement(
          'div',
          { className: className, onClick: this.handleClick },
          _react2.default.createElement(
            'div',
            { className: theme.templateValue + ' ' + theme.value },
            this.props.template(selected)
          ),
          this.props.label ? _react2.default.createElement(
            'label',
            { className: theme.label },
            this.props.label,
            this.props.required ? _react2.default.createElement(
              'span',
              { className: theme.required },
              ' * '
            ) : null
          ) : null,
          this.props.error ? _react2.default.createElement(
            'span',
            { className: theme.error },
            this.props.error
          ) : null
        );
      }
    }, {
      key: 'render',
      value: function render() {
        var _classnames3,
            _this2 = this;

        var _props = this.props,
            allowBlank = _props.allowBlank,
            auto = _props.auto,
            labelKey = _props.labelKey,
            required = _props.required,
            onChange = _props.onChange,
            onFocus = _props.onFocus,
            onBlur = _props.onBlur,
            source = _props.source,
            template = _props.template,
            theme = _props.theme,
            valueKey = _props.valueKey,
            others = _objectWithoutProperties(_props, ['allowBlank', 'auto', 'labelKey', 'required', 'onChange', 'onFocus', 'onBlur', 'source', 'template', 'theme', 'valueKey']);

        var selected = this.getSelectedItem();
        var className = (0, _classnames5.default)(theme.dropdown, (_classnames3 = {}, _defineProperty(_classnames3, theme.up, this.state.up), _defineProperty(_classnames3, theme.active, this.state.active), _defineProperty(_classnames3, theme.disabled, this.props.disabled), _defineProperty(_classnames3, theme.required, this.props.required), _classnames3), this.props.className);

        return _react2.default.createElement(
          'div',
          {
            className: className,
            'data-react-toolbox': 'dropdown',
            onBlur: this.handleBlur,
            onFocus: this.handleFocus,
            tabIndex: this.state.active ? -1 : 0
          },
          _react2.default.createElement(Input, _extends({}, others, {
            tabIndex: '-1',
            className: theme.value,
            onClick: this.handleClick,
            required: this.props.required,
            readOnly: true,
            type: template && selected ? 'hidden' : null,
            theme: theme,
            themeNamespace: 'input',
            value: selected && selected[labelKey] ? selected[labelKey] : ''
          })),
          template && selected ? this.renderTemplateValue(selected) : null,
          _react2.default.createElement(
            'ul',
            {
              ref: function ref(dropdown) {
                return _this2.itemsContainer = dropdown;
              },
              className: theme.values,
              onKeyDown: this.handleKeyDown },
            source.map(this.renderValue)
          )
        );
      }
    }]);

    return Dropdown;
  }(_react.Component);

  Dropdown.propTypes = {
    allowBlank: _propTypes2.default.bool,
    auto: _propTypes2.default.bool,
    className: _propTypes2.default.string,
    disabled: _propTypes2.default.bool,
    error: _propTypes2.default.string,
    label: _propTypes2.default.string,
    labelKey: _propTypes2.default.string,
    name: _propTypes2.default.string,
    onBlur: _propTypes2.default.func,
    onChange: _propTypes2.default.func,
    onClick: _propTypes2.default.func,
    onFocus: _propTypes2.default.func,
    required: _propTypes2.default.bool,
    source: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object])).isRequired,
    template: _propTypes2.default.func,
    theme: _propTypes2.default.shape({
      active: _propTypes2.default.string,
      disabled: _propTypes2.default.string,
      dropdown: _propTypes2.default.string,
      error: _propTypes2.default.string,
      errored: _propTypes2.default.string,
      field: _propTypes2.default.string,
      label: _propTypes2.default.string,
      required: _propTypes2.default.string,
      selected: _propTypes2.default.string,
      focused: _propTypes2.default.string,
      templateValue: _propTypes2.default.string,
      up: _propTypes2.default.string,
      value: _propTypes2.default.string,
      values: _propTypes2.default.string
    }),
    value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    valueKey: _propTypes2.default.string
  };
  Dropdown.defaultProps = {
    auto: true,
    className: '',
    allowBlank: true,
    disabled: false,
    labelKey: 'label',
    required: false,
    valueKey: 'value'
  };


  return Dropdown;
};

var Dropdown = factory(_Input2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.DROPDOWN)(Dropdown);
exports.dropdownFactory = factory;
exports.Dropdown = Dropdown;