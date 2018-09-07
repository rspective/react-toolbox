'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var selectorTest = function selectorTest(node, selectors) {
  return selectors.some(function (selector) {
    return node.matches(selector);
  });
};

var findMatchingParent = function findMatchingParent(event, selectors) {
  var node = event.target;
  while (node !== null) {
    if (selectorTest(node, selectors)) {
      return node;
    }
    node = node.parentNode;
  }
  return null;
};

/* eslint-disable react/no-find-dom-node */

var Scrollable = function (_React$Component) {
  _inherits(Scrollable, _React$Component);

  function Scrollable() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Scrollable);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Scrollable.__proto__ || Object.getPrototypeOf(Scrollable)).call.apply(_ref, [this].concat(args))), _this), _this.onTouchStart = function () {
      _this.prevPos = _this.childrenDomElement.getBoundingClientRect().y;
    }, _this.onTouchMove = function (e) {
      e.preventDefault();
      var change = e.changedTouches[0];
      var matchingParent = findMatchingParent(e, ['div[data-react-toolbox="dialog"]', '.Pane']);

      if (Math.abs(_this.prevPos - change.pageY) < 5) return;

      if (_this.prevPos - change.pageY > 0) {
        matchingParent.scrollTop += window.innerHeight * 0.02;
      } else {
        matchingParent.scrollTop -= window.innerHeight * 0.02;
      }
      _this.prevPos = change.pageY;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Scrollable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.childrenDomElement = (0, _reactDom.findDOMNode)(this);
      this.childrenDomElement.addEventListener('touchstart', this.onTouchStart);
      this.childrenDomElement.addEventListener('touchmove', this.onTouchMove);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.childrenDomElement.removeEventListener('touchstart', this.onTouchStart);
      this.childrenDomElement.removeEventListener('touchmove', this.onTouchMove);
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return Scrollable;
}(_react2.default.Component);

Scrollable.propTypes = {
  children: _propTypes2.default.node.isRequired
};

exports.default = Scrollable;