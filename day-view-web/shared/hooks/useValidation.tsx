import { useState } from 'react';
import { VALIDATION_LENGTH } from '@/constants/validate';

type ValueType = {
  channelName: string;
  test: number;
};

type ValidateType = keyof ValueType;

// 특수문자 제외
const regex = /^[a-zA-Z0-9\s$_]*$/;

const useValidation = <T extends ValidateType>(type: T) => {
  const [isValid, setIsValid] = useState<boolean>(false);

  const getValidateTypeMessage = () => {};

  const validate = (value: ValueType[T]): void => {
    switch (type) {
      case 'channelName':
        if (
          typeof value === 'string' &&
          VALIDATION_LENGTH.MIN_LENGTH < value.length &&
          value.length < VALIDATION_LENGTH.CHANNEL_MAX_LENGTH
        ) {
          setIsValid(true);
        }
        break;
    }
  };

  return { isValid, validate };
};

export default useValidation;
