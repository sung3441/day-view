import { CSSProperties } from 'react';
import styled from 'styled-components';
import { TimeField, TimeValidationError } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { FieldChangeHandlerContext } from '@mui/x-date-pickers/internals';

import { pixelToRemUnit, getStyledThemProperty } from '@/shared/styles/util';

export type timeFormat = 'HH:mm';

interface Props {
  format?: timeFormat;
  value?: Dayjs;
  onChange?: (
    newValue: unknown,
    context: FieldChangeHandlerContext<TimeValidationError>
  ) => void;
  style?: CSSProperties;
  disabled?: boolean;
}

const TimeInput = ({ onChange, format = 'HH:mm', ...props }: Props) => {
  return (
    <S.TimeField
      format={format}
      onChange={(newValue, context) => onChange && onChange(newValue, context)}
      {...props}
    />
  );
};

export default TimeInput;

const S = {
  TimeField: styled(TimeField)`
    width: ${pixelToRemUnit(100)};

    input {
      box-sizing: border-box;
      height: 48px;
      padding: 8px 18px;
      ${getStyledThemProperty('fonts', 'caption2')}
      color: ${getStyledThemProperty('colors', 'Black')};
      border: 1px solid ${getStyledThemProperty('colors', 'G_300')};
      border-radius: 7px;
    }
  `,
};
