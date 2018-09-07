import React from 'react';
import { themr } from 'react-css-themr';
import { INPUT } from '../identifiers';
import { inputFactory } from './Input';
import { FontIcon } from '../font_icon/FontIcon';
import theme from './theme.css';
import Scrollable from '../Scrollable';

const RTInput = inputFactory(FontIcon);
const Input = (...props) => <Scrollable><RTInput {...props} /></Scrollable>;
const ThemedInput = themr(INPUT, theme, { withRef: true })(Input);

export default ThemedInput;
export { ThemedInput as Input };
