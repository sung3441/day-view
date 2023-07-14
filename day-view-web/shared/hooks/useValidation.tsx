import { useCallback, useState } from 'react';
import { VALIDATION_LENGTH } from '@/constants/validate';
import { Dayjs } from 'dayjs';

type ValueType = {
  channelNameLength: string;
  empty: string;
  dateRange: { startDate: Dayjs; endDate: Dayjs };
};

type ValidateType = keyof ValueType;

/**
 * 인자로 전달한 타입에 따라 validate 함수로 유효성 검사. isValid의 값을 변경함
 * @param ValidateType 유효성 검사 타입
 * @returns isValid, validate
 */
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
      }
    },
    [type]
  );

  return { isValid, validate };
};

export default useValidation;
