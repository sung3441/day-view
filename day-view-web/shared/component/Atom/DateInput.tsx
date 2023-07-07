import { CSSProperties } from 'react';
import styled from 'styled-components';
import { DateField, DateValidationError } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { FieldChangeHandlerContext } from '@mui/x-date-pickers/internals';

import { pixelToRemUnit, getStyledThemProperty } from '@/shared/styles/util';

export type dateFormat = 'YYYY-MM-DD';

interface Props {
  format?: dateFormat;
  value?: Dayjs;
  onChange?: (
    newValue: unknown,
    context: FieldChangeHandlerContext<DateValidationError>
  ) => void;
  style?: CSSProperties;
  minDate?: unknown;
  maxDate?: unknown;
}

const DateInput = ({
  value,
  onChange,
  style,
  minDate,
  maxDate,
  format = 'YYYY-MM-DD',
}: Props) => {
  return (
    <S.DateField
      format={format}
      value={value}
      onChange={(newValue, context) => onChange && onChange(newValue, context)}
      style={style}
      minDate={minDate}
      maxDate={maxDate}
    />
  );
};

export default DateInput;

const S = {
  DateField: styled(DateField)`
    width: ${pixelToRemUnit(175)};

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
