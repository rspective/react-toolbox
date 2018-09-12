import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import classnames from 'classnames';
import { CARD } from '../identifiers';
import Scrollable from '../Scrollable';

/* eslint-disable react/prefer-stateless-function */

class CardActions extends React.Component {
  render() {
    const { children, className, theme, ...other } = this.props;
    return (
      <Scrollable>
        <div className={classnames(theme.cardActions, className)} {...other}>
          {children}
        </div>
      </Scrollable>
    );
  }
}

/* eslint-enable react/prefer-stateless-function */

CardActions.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  theme: PropTypes.shape({
    cardActions: PropTypes.string,
  }),
};

export default themr(CARD)(CardActions);
export { CardActions };
