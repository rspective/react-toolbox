'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimePicker = undefined;

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('react-toolbox/lib/identifiers');

var _dialog = require('react-toolbox/lib/dialog');

var _input = require('react-toolbox/lib/input');

var _theme = require('react-toolbox/lib/time_picker/theme.css');

var _theme2 = _interopRequireDefault(_theme);

var _TimePicker = require('./TimePicker');

var _TimePickerDialog = require('./TimePickerDialog');

var _TimePickerDialog2 = _interopRequireDefault(_TimePickerDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TimePickerDialog = (0, _TimePickerDialog2.default)(_dialog.Dialog);
var ThemedTimePicker = (0, _reactCssThemr.themr)(_identifiers.TIME_PICKER, _theme2.default)((0, _TimePicker.timePickerFactory)(TimePickerDialog, _input.Input));
exports.default = ThemedTimePicker;
exports.TimePicker = ThemedTimePicker;