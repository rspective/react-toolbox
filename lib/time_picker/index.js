import { themr } from 'react-css-themr';
import { TIME_PICKER } from 'react-toolbox/lib/identifiers';
import { Dialog } from 'react-toolbox/lib/dialog';
import { Input } from 'react-toolbox/lib/input';
import theme from 'react-toolbox/lib/time_picker/theme.css';

import { timePickerFactory } from './TimePicker';
import timePickerDialogFactory from './TimePickerDialog';

const TimePickerDialog = timePickerDialogFactory(Dialog);
const ThemedTimePicker = themr(TIME_PICKER, theme)(timePickerFactory(TimePickerDialog, Input));
export default ThemedTimePicker;
export { ThemedTimePicker as TimePicker };
