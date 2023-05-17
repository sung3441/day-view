import Image from 'next/image';
import { memo } from 'react';

type SizeType = 'small' | 'large';

interface Props {
  src: string;
  size?: SizeType;
}

const imageSizes = {
  small: { width: 48, height: 48 },
  large: { width: 112, height: 112 },
};

/**
 * TODO: Refactor
 */
const UserImage = ({ src, size = 'small' }: Props) => {
  return (
    <Image
      src={`images/icon/user.svg`}
      alt="UserImage"
      width={imageSizes[size].width}
      height={imageSizes[size].height}
      style={{
        backgroundColor: 'gray',
        borderRadius: '50%',
      }}
    />
  );
};

export default memo(UserImage);
