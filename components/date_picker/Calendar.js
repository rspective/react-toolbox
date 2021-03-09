import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';
import { range, getAnimationModule } from '../utils/utils';
import time from '../utils/time';
import CalendarMonth from './CalendarMonth';
import KEYS from '../utils/keymap';

const DIRECTION_STEPS = { left: -1, right: 1 };

const factory = (IconButton) => {
  class Calendar extends Component {
    static propTypes = {
      disabledDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
      display: PropTypes.oneOf(['months', 'years']),
      enabledDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
      handleSelect: PropTypes.func,
      locale: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
      ]),
      maxDate: PropTypes.instanceOf(Date),
      minDate: PropTypes.instanceOf(Date),
      onChange: PropTypes.func,
      selectedDate: PropTypes.instanceOf(Date),
      sundayFirstDayOfWeek: PropTypes.bool,
      theme: PropTypes.shape({
        active: PropTypes.string,
        calendar: PropTypes.string,
        next: PropTypes.string,
        prev: PropTypes.string,
        years: PropTypes.string,
      }),
    };

    static defaultProps = {
      display: 'months',
      selectedDate: new Date(),
    };

    state = {
      viewDate: this.props.selectedDate,
    };

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillMount() {
      document.body.addEventListener('keydown', this.handleKeys);
    }

    componentDidUpdate() {
      if (this.activeYearNode) {
        this.scrollToActive();
      }
    }

    componentWillUnmount() {
      document.body.removeEventListener('keydown', this.handleKeys);
    }

    scrollToActive() {
      const offset = (this.yearsNode.offsetHeight / 2) + (this.activeYearNode.offsetHeight / 2);
      this.yearsNode.scrollTop = this.activeYearNode.offsetTop - offset;
    }

    handleDayClick = (day) => {
      this.props.onChange(time.setDay(this.state.viewDate, day), true);
    };

    handleYearClick = (event) => {
      const year = parseInt(event.currentTarget.id, 10);
      const viewDate = time.setYear(this.props.selectedDate, year);
      this.setState({ viewDate });
      this.props.onChange(viewDate, false);
    };

    handleKeys = (e) => {
      const { selectedDate } = this.props;
      const charCode = e.which || e.keyCode;
      const steeringKeys = [
        KEYS.LEFT_ARROW,
        KEYS.UP_ARROW,
        KEYS.RIGHT_ARROW,
        KEYS.DOWN_ARROW,
        KEYS.ENTER,
        KEYS.SPACE,
      ];

      if (steeringKeys.includes(charCode)) {
        e.preventDefault();
        e.stopPropagation();
      }

      switch (charCode) {
        case KEYS.ENTER:
        case KEYS.SPACE:
          this.props.handleSelect();
          break;
        case KEYS.LEFT_ARROW: this.handleDayArrowKey(time.addDays(selectedDate, -1)); break;
        case KEYS.UP_ARROW: this.handleDayArrowKey(time.addDays(selectedDate, -7)); break;
        case KEYS.RIGHT_ARROW: this.handleDayArrowKey(time.addDays(selectedDate, 1)); break;
        case KEYS.DOWN_ARROW: this.handleDayArrowKey(time.addDays(selectedDate, 7)); break;
        default: break;
      }
    }

    handleDayArrowKey = (date) => {
      this.setState({ viewDate: date });
      this.props.onChange(date, false);
    }

    changeViewMonth = (event) => {
      const direction = event.currentTarget.id;
      this.setState({
        direction,
        viewDate: time.addMonths(this.state.viewDate, DIRECTION_STEPS[direction]),
      });
    };

    renderYears() {
      return (
        <ul
          data-react-toolbox="years"
          className={this.props.theme.years}
          ref={(node) => { this.yearsNode = node; }}
        >
          {range(1900, 2100).map(year => (
            <li
              className={year === this.state.viewDate.getFullYear() ? this.props.theme.active : ''}
              id={year}
              key={year}
              onClick={this.handleYearClick}
              ref={(node) => {
                if (year === this.state.viewDate.getFullYear()) {
                  this.activeYearNode = node;
                }
              }}
            >
              {year}
            </li>
          ))}
        </ul>
      );
    }

    renderMonths() {
      const { theme } = this.props;
      const animation = this.state.direction === 'left' ? 'slideLeft' : 'slideRight';
      const animationModule = getAnimationModule(animation, theme);
      return (
        <div data-react-toolbox="calendar">
          <IconButton id="left" className={theme.prev} icon="chevron_left" onClick={this.changeViewMonth} />
          <IconButton id="right" className={theme.next} icon="chevron_right" onClick={this.changeViewMonth} />
          <TransitionGroup>
            <CSSTransition classNames={animationModule} timeout={350}>
              <CalendarMonth
                enabledDates={this.props.enabledDates}
                disabledDates={this.props.disabledDates}
                key={this.state.viewDate.getMonth()}
                locale={this.props.locale}
                maxDate={this.props.maxDate}
                minDate={this.props.minDate}
                onDayClick={this.handleDayClick}
                selectedDate={this.props.selectedDate}
                sundayFirstDayOfWeek={this.props.sundayFirstDayOfWeek}
                theme={this.props.theme}
                viewDate={this.state.viewDate}
              />
            </CSSTransition>
          </TransitionGroup>
        </div>
      );
    }

    render() {
      return (
        <div className={this.props.theme.calendar}>
          {this.props.display === 'months' ? this.renderMonths() : this.renderYears()}
        </div>
      );
    }
  }

  return Calendar;
};

export default factory;
