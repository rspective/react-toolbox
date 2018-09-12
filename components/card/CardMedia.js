import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import classnames from 'classnames';
import { CARD } from '../identifiers';
import Scrollable from '../Scrollable';

/* eslint-disable react/prefer-stateless-function */

class CardMedia extends React.Component {

  render() {
    const {
      aspectRatio,
      children,
      className,
      color,
      contentOverlay,
      image,
      theme,
      ...other
    } = this.props;

    const classes = classnames(theme.cardMedia, {
      [theme[aspectRatio]]: aspectRatio,
    }, className);

    const innerClasses = classnames(theme.content, {
      [theme.contentOverlay]: contentOverlay,
    });

    const bgStyle = {
      backgroundColor: color || undefined,
      backgroundImage: typeof image === 'string' ? `url('${image}')` : undefined,
    };

    return (
      <Scrollable>
        <div style={bgStyle} className={classes} {...other}>
          <div className={innerClasses}>
            {children}
          </div>
        </div>
      </Scrollable>
    );
  }
}

/* eslint-enable react/prefer-stateless-function */


CardMedia.propTypes = {
  aspectRatio: PropTypes.oneOf(['wide', 'square']),
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string,
  contentOverlay: PropTypes.bool,
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  theme: PropTypes.shape({
    cardMedia: PropTypes.string,
    content: PropTypes.string,
    contentOverlay: PropTypes.string,
    square: PropTypes.string,
    wide: PropTypes.string,
  }),
};

export default themr(CARD)(CardMedia);
export { CardMedia };
