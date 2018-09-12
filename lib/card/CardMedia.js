'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardMedia = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactCssThemr = require('react-css-themr');

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _identifiers = require('../identifiers');

var _Scrollable = require('../Scrollable');

var _Scrollable2 = _interopRequireDefault(_Scrollable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/prefer-stateless-function */

var CardMedia = function (_React$Component) {
  _inherits(CardMedia, _React$Component);

  function CardMedia() {
    _classCallCheck(this, CardMedia);

    return _possibleConstructorReturn(this, (CardMedia.__proto__ || Object.getPrototypeOf(CardMedia)).apply(this, arguments));
  }

  _createClass(CardMedia, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          aspectRatio = _props.aspectRatio,
          children = _props.children,
          className = _props.className,
          color = _props.color,
          contentOverlay = _props.contentOverlay,
          image = _props.image,
          theme = _props.theme,
          other = _objectWithoutProperties(_props, ['aspectRatio', 'children', 'className', 'color', 'contentOverlay', 'image', 'theme']);

      var classes = (0, _classnames4.default)(theme.cardMedia, _defineProperty({}, theme[aspectRatio], aspectRatio), className);

      var innerClasses = (0, _classnames4.default)(theme.content, _defineProperty({}, theme.contentOverlay, contentOverlay));

      var bgStyle = {
        backgroundColor: color || undefined,
        backgroundImage: typeof image === 'string' ? 'url(\'' + image + '\')' : undefined
      };

      return _react2.default.createElement(
        _Scrollable2.default,
        null,
        _react2.default.createElement(
          'div',
          _extends({ style: bgStyle, className: classes }, other),
          _react2.default.createElement(
            'div',
            { className: innerClasses },
            children
          )
        )
      );
    }
  }]);

  return CardMedia;
}(_react2.default.Component);

/* eslint-enable react/prefer-stateless-function */

CardMedia.propTypes = {
  aspectRatio: _propTypes2.default.oneOf(['wide', 'square']),
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  color: _propTypes2.default.string,
  contentOverlay: _propTypes2.default.bool,
  image: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]),
  theme: _propTypes2.default.shape({
    cardMedia: _propTypes2.default.string,
    content: _propTypes2.default.string,
    contentOverlay: _propTypes2.default.string,
    square: _propTypes2.default.string,
    wide: _propTypes2.default.string
  })
};

exports.default = (0, _reactCssThemr.themr)(_identifiers.CARD)(CardMedia);
exports.CardMedia = CardMedia;