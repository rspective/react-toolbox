import React from 'react';
import propTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

const selectorTest = (node, selectors) => selectors.some(selector => node.matches(selector));

const findMatchingParent = (event, selectors) => {
  let node = event.target;
  while (node !== null) {
    if (selectorTest(node, selectors)) {
      return node;
    }
    node = node.parentNode;
  }
  return null;
};

/* eslint-disable react/no-find-dom-node */

class Scrollable extends React.Component {
  componentDidMount() {
    this.childrenDomElement = findDOMNode(this);
    this.childrenDomElement.addEventListener('touchstart', this.onTouchStart);
    this.childrenDomElement.addEventListener('touchmove', this.onTouchMove);
  }
  componentWillUnmount() {
    this.childrenDomElement.removeEventListener('touchstart', this.onTouchStart);
    this.childrenDomElement.removeEventListener('touchmove', this.onTouchMove);
  }
  onTouchStart = () => {
    this.prevPos = this.childrenDomElement.getBoundingClientRect().y;
  }
  onTouchMove = (e) => {
    e.preventDefault();
    const change = e.changedTouches[0];
    const matchingParent = findMatchingParent(e, ['div[data-react-toolbox="dialog"]', '.Pane']);

    if (Math.abs(this.prevPos - change.pageY) < 5) return;

    if (this.prevPos - change.pageY > 0) {
      matchingParent.scrollTop += window.innerHeight * 0.02;
    } else {
      matchingParent.scrollTop -= window.innerHeight * 0.02;
    }
    this.prevPos = change.pageY;
  }
  render() {
    return this.props.children;
  }
}

Scrollable.propTypes = {
  children: propTypes.node.isRequired,
};

export default Scrollable;

