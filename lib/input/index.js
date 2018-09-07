'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers');

var _Input = require('./Input');

var _FontIcon = require('../font_icon/FontIcon');

var _theme = require('./theme.css');

var _theme2 = _interopRequireDefault(_theme);

var _Scrollable = require('../Scrollable');

var _Scrollable2 = _interopRequireDefault(_Scrollable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RTInput = (0, _Input.inputFactory)(_FontIcon.FontIcon);
var Input = function Input() {
  for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
    props[_key] = arguments[_key];
  }

  return _react2.default.createElement(
    _Scrollable2.default,
    null,
    _react2.default.createElement(RTInput, props)
  );
};
var ThemedInput = (0, _reactCssThemr.themr)(_identifiers.INPUT, _theme2.default, { withRef: true })(Input);

exports.default = ThemedInput;
exports.Input = ThemedInput;