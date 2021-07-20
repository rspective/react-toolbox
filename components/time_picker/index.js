import { themr } from '@friendsofreactjs/react-css-themr';
import { TIME_PICKER } from '../identifiers';
import { Dialog } from '../dialog';
import { Input } from '../input';
import theme from './theme.css';

import { timePickerFactory } from './TimePicker';
import timePickerDialogFactory from './TimePickerDialog';

const TimePickerDialog = timePickerDialogFactory(Dialog);
const ThemedTimePicker = themr(TIME_PICKER, theme)(timePickerFactory(TimePickerDialog, Input));
export default ThemedTimePicker;
export { ThemedTimePicker as TimePicker };
