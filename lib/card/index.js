'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardTitle = exports.CardText = exports.CardMedia = exports.CardActions = exports.Card = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers');

var _Card = require('./Card');

var _CardActions = require('./CardActions');

var _CardMedia = require('./CardMedia');

var _CardText = require('./CardText');

var _CardTitle = require('./CardTitle');

var _avatar = require('../avatar');

var _theme = require('./theme.css');

var _theme2 = _interopRequireDefault(_theme);

var _Scrollable = require('../Scrollable');

var _Scrollable2 = _interopRequireDefault(_Scrollable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RTCardTitle = (0, _CardTitle.cardTitleFactory)(_avatar.Avatar);

var Card = function Card(props) {
  return _react2.default.createElement(
    _Scrollable2.default,
    null,
    _react2.default.createElement(_Card.Card, props)
  );
};
var CardActions = function CardActions(props) {
  return _react2.default.createElement(
    _Scrollable2.default,
    null,
    _react2.default.createElement(_CardActions.CardActions, props)
  );
};
var CardMedia = function CardMedia(props) {
  return _react2.default.createElement(
    _Scrollable2.default,
    null,
    _react2.default.createElement(_CardMedia.CardMedia, props)
  );
};
var CardText = function CardText(props) {
  return _react2.default.createElement(
    _Scrollable2.default,
    null,
    _react2.default.createElement(_CardText.CardText, props)
  );
};
var CardTitle = function CardTitle(props) {
  return _react2.default.createElement(
    _Scrollable2.default,
    null,
    _react2.default.createElement(RTCardTitle, props)
  );
};

var ThemedCard = (0, _reactCssThemr.themr)(_identifiers.CARD, _theme2.default)(Card);
var ThemedCardActions = (0, _reactCssThemr.themr)(_identifiers.CARD, _theme2.default)(CardActions);
var ThemedCardMedia = (0, _reactCssThemr.themr)(_identifiers.CARD, _theme2.default)(CardMedia);
var ThemedCardText = (0, _reactCssThemr.themr)(_identifiers.CARD, _theme2.default)(CardText);
var ThemedCardTitle = (0, _reactCssThemr.themr)(_identifiers.CARD, _theme2.default)(CardTitle);

exports.default = ThemedCard;
exports.Card = ThemedCard;
exports.CardActions = ThemedCardActions;
exports.CardMedia = ThemedCardMedia;
exports.CardText = ThemedCardText;
exports.CardTitle = ThemedCardTitle;