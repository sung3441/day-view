import Image from 'next/image';
import { memo } from 'react';
import styled from 'styled-components';

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
    <StyledImage
      src={`images/icon/user.svg`}
      alt="UserImage"
      width={imageSizes[size].width}
      height={imageSizes[size].height}
    />
  );
};

export default memo(UserImage);

const StyledImage = styled(Image)`
  border-radius: 50%;

  :hover {
    background-color: gray;
  }
`;
