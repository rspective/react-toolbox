import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import classnames from 'classnames';
import { CARD } from '../identifiers';
import Scrollable from '../Scrollable';

/* eslint-disable react/prefer-stateless-function */

const Card = ({ children, className, raised, theme, ...other }) => {
  const classes = classnames(theme.card, {
    [theme.raised]: raised,
  }, className);

  return (
    <Scrollable>
      <div data-react-toolbox="card" className={classes} {...other}>
        {children}
      </div>
    </Scrollable>
  );
};

/* eslint-disable react/prefer-stateless-function */

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  raised: PropTypes.bool,
  theme: PropTypes.shape({
    card: PropTypes.string,
    raised: PropTypes.string,
  }),
};

export default themr(CARD)(Card);
export { Card };
