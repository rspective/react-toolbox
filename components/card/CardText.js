import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import classnames from 'classnames';
import { CARD } from '../identifiers';
import Scrollable from '../Scrollable';

/* eslint-disable react/prefer-stateless-function */

class CardText extends React.Component {

  render() {
    const { children, className, theme, ...other } = this.props;
    return (
      <Scrollable>
        <div className={classnames(theme.cardText, className)} {...other}>
          {typeof children === 'string' ? <p>{children}</p> : children}
        </div>
      </Scrollable>
    );
  }
}

/* eslint-enable react/prefer-stateless-function */

CardText.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  theme: PropTypes.shape({
    cardText: PropTypes.string,
  }),
};

export default themr(CARD)(CardText);
export { CardText };
