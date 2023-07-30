import { useCallback, useState } from 'react';
import { VALIDATION_LENGTH } from '@/shared/constant/validate';

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

  const getInvalidMessage = (type: ValidateType): string => {
    switch (type) {
      case 'channelNameLength':
        return `${VALIDATION_LENGTH.MIN_LENGTH}자 ~ ${VALIDATION_LENGTH.CHANNEL_MAX_LENGTH}자로 입력해주세요.`;
      case 'empty':
        return '제목을 입력해주세요.';
      default:
        return '';
    }
  };

  const validate = useCallback(
    (value: ValueType[T]): void => {
      let valid = false;

      switch (type) {
        // 채널명 글자 수 제한
        case 'channelNameLength':
          if (
            VALIDATION_LENGTH.MIN_LENGTH <= value.length &&
            value.length < VALIDATION_LENGTH.CHANNEL_MAX_LENGTH
          ) {
            valid = true;
          }
          break;

        // 채널명 길이가 0인지 체크
        case 'empty':
          if (value.length !== 0) {
            valid = true;
          }
          break;

        // 두 값이 다른 경우만 true
        case 'isNameDifferent':
          if (value[0] !== value[1]) {
            valid = true;
          }
          break;

        default:
          console.error(`유효하지 않은 검사 타입: ${type}`);
          break;
      }

      setIsValid(valid);
    },
    [type]
  );

  const InvalidMessage = getInvalidMessage(type);

  return { isValid, InvalidMessage, validate };
};

export default useValidation;
