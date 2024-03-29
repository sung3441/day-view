import { CSSProperties, useState } from 'react';
import { DateValidationError } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { FieldChangeHandlerContext } from '@mui/x-date-pickers/internals';

import { DateInput } from '@/shared/component/Atom';
import { dateFormat } from '../Atom/DateInput';

type contextType = FieldChangeHandlerContext<DateValidationError>;

interface Props {
  format?: dateFormat;
  value?: { startDate?: Dayjs; endDate?: Dayjs };
  onChange?: (
    values: { startDate?: unknown; endDate?: unknown },
    contexts: { startDate?: contextType; endDate?: contextType }
  ) => void;
  style?: CSSProperties;
  children?: React.ReactNode;
  disabled?: boolean;
}

const DateRangeInput = ({
  value,
  onChange,
  style,
  children,
  disabled,
  format = 'YYYY-MM-DD',
}: Props) => {
  const [values, setValues] = useState<{
    startDate?: unknown;
    endDate?: unknown;
  }>();
  const [contexts, setContexts] = useState<{
    startDate?: contextType;
    endDate?: contextType;
  }>();

  const handleOnChange = (
    newValue: unknown,
    context: contextType,
    index: 'startDate' | 'endDate'
  ) => {
    const newValues = { ...values };
    const newContexts = { ...contexts };

    switch (index) {
      case 'startDate':
        newValues[index] = newValue;
        newContexts[index] = context;

        break;

      case 'endDate':
        newValues[index] = newValue;
        newContexts[index] = context;

        break;
    }

    setValues(newValues);
    setContexts(newContexts);
    onChange && onChange(newValues, newContexts);
  };

  return (
    <div>
      <DateInput
        format={format}
        value={value?.startDate}
        onChange={(newValue, context) =>
          handleOnChange(newValue, context, 'startDate')
        }
        style={style}
        maxDate={values?.endDate}
        disabled={disabled}
      />
      {children}
      <DateInput
        format={format}
        value={value?.endDate}
        onChange={(newValue, context) =>
          handleOnChange(newValue, context, 'endDate')
        }
        style={style}
        minDate={values?.startDate}
        disabled={disabled}
      />
    </div>
  );
};

export default DateRangeInput;
