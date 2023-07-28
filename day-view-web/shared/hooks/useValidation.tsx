import { useCallback, useState } from 'react';
import { VALIDATION_LENGTH } from '@/constants/validate';

/** ValueType에 따라 validate 함수 파라미터 타입이 변경됌. */
type ValueType = {
  channelNameLength: string;
  empty: string;
  isNameDifferent: [string, string];
};

type ValidateType = keyof ValueType;

/**
 * 인자로 전달한 타입에 따라 validate 함수로 유효성 검사. isValid의 값을 변경함
 * @param ValidateType 유효성 검사 타입, 해당 파라미터에 따라 validate 함수의 파라미터 타입이 지정됌
 * @returns isValid, validate
 */
const useValidation = <T extends ValidateType>(type: T) => {
  const [isValid, setIsValid] = useState<boolean>(false);

  const validate = useCallback(
    (value: ValueType[T]): void => {
      switch (type) {
        // 채널명 글자 수 제한
        case 'channelNameLength':
          typeof value === 'string' &&
          VALIDATION_LENGTH.MIN_LENGTH <= value.length &&
          value.length < VALIDATION_LENGTH.CHANNEL_MAX_LENGTH
            ? setIsValid(true)
            : setIsValid(false);
          break;

        // 채널명 길이가 0인지 체크
        case 'empty':
          typeof value === 'string' && value.length !== 0
            ? setIsValid(true)
            : setIsValid(false);
          break;

        //
        case 'isNameDifferent':
          typeof value === 'string' && value[0] !== value[1]
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
