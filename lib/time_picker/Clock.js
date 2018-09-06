/* eslint-disable import/no-extraneous-dependencies,react/jsx-filename-extension */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { getAnimationModule } from 'react-toolbox/lib/utils/utils';
import time from 'react-toolbox/lib/utils/time';
import Hours from 'react-toolbox/lib/time_picker/ClockHours';
import Minutes from 'react-toolbox/lib/time_picker/ClockMinutes';

class Clock extends Component {
  static propTypes = {
    display: PropTypes.oneOf(['hours', 'minutes']),
    format: PropTypes.oneOf(['24hr', 'ampm']),
    onChange: PropTypes.func,
    onHandMoved: PropTypes.func,
    theme: PropTypes.shape({
      clock: PropTypes.string,
      clockWrapper: PropTypes.string,
      placeholder: PropTypes.string,
    }),
    time: PropTypes.instanceOf(Date),
  };

  static defaultProps = {
    className: '',
    display: 'hours',
    format: '24hr',
    time: new Date(),
  };

  state = {
    center: { x: null, y: null },
    radius: 0,
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleCalculateShape);
    setTimeout(() => {
      this.handleCalculateShape();
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleCalculateShape);
  }

  handleHourChange = (hours) => {
    if (this.props.time.getHours() !== hours) {
      this.props.onChange(time.setHours(this.props.time, this.adaptHourToFormat(hours)));
    }
  };

  handleMinuteChange = (minutes) => {
    if (this.props.time.getMinutes() !== minutes) {
      this.props.onChange(time.setMinutes(this.props.time, minutes));
    }
  };

  handleCalculateShape = () => {
    const { top, left, width } = this.placeholderNode.getBoundingClientRect();
    const { radius: previousRadius, center } = this.state;
    const { x: previousX, y: previousY } = center;

    const x = left + ((width / 2) - window.pageXOffset);
    const y = top + ((width / 2) - window.pageXOffset);
    const radius = width / 2;

    this.setState({
      center: { x, y },
      radius,
    });

    /*
    This is very tricky. It seems that React 16 changed lifecycle of components. Before, in React 15, the lifecycle of TimePicker was just fine.
    Meaning, Clock got rendered first (with empty center and radius = 0), then calculate shape was called and returned inaccurate values for center
    and radius. However, these values were fine enough to show something. So Clock has been rendered again. Then scheduled in TimePickedDialog call to
    calculate shape was triggered, which finally got the best coordinates. And of course Clock was again rendered.

    Now, whenever we mount and render Clock, we first compute coordinates of clock and if they're changed, we trigger next calculation in short time.
    Then again we check coordinates until they're same so we're sure that what we see is the same as what we click.
     */
    if (previousRadius !== radius || previousX !== x || previousY !== y) {
      setTimeout(this.handleCalculateShape, 100);
    }
  };

  adaptHourToFormat(hour) {
    if (this.props.format === 'ampm') {
      if (time.getTimeMode(this.props.time) === 'pm') {
        return hour < 12 ? hour + 12 : hour;
      }
      return hour === 12 ? 0 : hour;
    }
    return hour;
  }

  renderHours() {
    return (
      <Hours
        center={this.state.center}
        format={this.props.format}
        onChange={this.handleHourChange}
        radius={this.state.radius}
        selected={this.props.time.getHours()}
        spacing={this.state.radius * 0.18}
        onHandMoved={this.props.onHandMoved}
        theme={this.props.theme}
      />
    );
  }

  renderMinutes() {
    return (
      <Minutes
        center={this.state.center}
        onChange={this.handleMinuteChange}
        radius={this.state.radius}
        selected={this.props.time.getMinutes()}
        spacing={this.state.radius * 0.18}
        onHandMoved={this.props.onHandMoved}
        theme={this.props.theme}
      />
    );
  }

  render() {
    const { theme } = this.props;
    const animation = this.state.display === 'hours' ? 'zoomOut' : 'zoomIn';
    const animationModule = getAnimationModule(animation, theme);
    return (
      <div data-react-toolbox="clock" className={theme.clock}>
        <div
          className={theme.placeholder}
          style={{ height: this.state.radius * 2 }}
          ref={(node) => { this.placeholderNode = node; }}
        >
          <CssTransitionGroup
            transitionName={animationModule}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            <div
              key={this.props.display}
              className={theme.clockWrapper}
              style={{ height: this.state.radius * 2 }}
            >
              {this.props.display === 'hours' ? this.renderHours() : null}
              {this.props.display === 'minutes' ? this.renderMinutes() : null}
            </div>
          </CssTransitionGroup>
        </div>
      </div>
    );
  }
}

export default Clock;
