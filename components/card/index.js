import React from 'react';
import { themr } from 'react-css-themr';
import { CARD } from '../identifiers';
import { Card as RTCard } from './Card';
import { CardActions as RTCardActions } from './CardActions';
import { CardMedia as RTCardMedia } from './CardMedia';
import { CardText as RTCardText } from './CardText';
import { cardTitleFactory } from './CardTitle';
import { Avatar } from '../avatar';
import theme from './theme.css';
import Scrollable from '../Scrollable';

const RTCardTitle = cardTitleFactory(Avatar);

const Card = props => <Scrollable><RTCard {...props} /></Scrollable>;
const CardActions = props => <Scrollable><RTCardActions {...props} /></Scrollable>;
const CardMedia = props => <Scrollable><RTCardMedia {...props} /></Scrollable>;
const CardText = props => <Scrollable><RTCardText {...props} /></Scrollable>;
const CardTitle = props => <Scrollable><RTCardTitle {...props} /></Scrollable>;

const ThemedCard = themr(CARD, theme)(Card);
const ThemedCardActions = themr(CARD, theme)(CardActions);
const ThemedCardMedia = themr(CARD, theme)(CardMedia);
const ThemedCardText = themr(CARD, theme)(CardText);
const ThemedCardTitle = themr(CARD, theme)(CardTitle);

export default ThemedCard;
export { ThemedCard as Card };
export { ThemedCardActions as CardActions };
export { ThemedCardMedia as CardMedia };
export { ThemedCardText as CardText };
export { ThemedCardTitle as CardTitle };
