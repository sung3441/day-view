import { useCallback, useState } from 'react';
import { VALIDATION_LENGTH } from '@/constants/validate';

type ValueType = {
  channelNameLength: string;
  empty: string;
};

type ValidateType = keyof ValueType;

const useValidation = <T extends ValidateType>(type: T) => {
  const [isValid, setIsValid] = useState<boolean>(false);

  const validate = useCallback(
    (value: ValueType[T]): void => {
      switch (type) {
        case 'channelNameLength':
          VALIDATION_LENGTH.MIN_LENGTH <= value.length &&
          value.length < VALIDATION_LENGTH.CHANNEL_MAX_LENGTH
            ? setIsValid(true)
            : setIsValid(false);
          break;

        case 'empty':
          value.length !== 0 ? setIsValid(true) : setIsValid(false);
          break;
      }
    },
    [type]
  );

  return { isValid, validate };
};

export default useValidation;
