import { useCallback, useState } from 'react';
import { VALIDATION_LENGTH } from '@/constants/validate';
import { Dayjs } from 'dayjs';

type ValueType = {
  channelNameLength: string;
  empty: string;
  dateRange: { startDate: Dayjs; endDate: Dayjs };
};

type ValidateType = keyof ValueType;

const useValidation = <T extends ValidateType>(type: T) => {
  const [isValid, setIsValid] = useState<boolean>(false);

  const validate = useCallback(
    (value: ValueType[T]): void => {
      switch (type) {
        case 'channelNameLength':
          typeof value === 'string' &&
          VALIDATION_LENGTH.MIN_LENGTH <= value.length &&
          value.length < VALIDATION_LENGTH.CHANNEL_MAX_LENGTH
            ? setIsValid(true)
            : setIsValid(false);
          break;

        case 'empty':
          typeof value === 'string' && value.length !== 0
            ? setIsValid(true)
            : setIsValid(false);
          break;

        case 'dateRange':
          break;
      }
    },
    [type]
  );

  return { isValid, validate };
};

export default useValidation;
