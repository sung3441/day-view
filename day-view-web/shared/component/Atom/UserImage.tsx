import Image from 'next/image';
import { CSSProperties, memo } from 'react';
import styled from 'styled-components';

type SizeType = 'small' | 'large';

interface Props {
  src: string;
  size?: SizeType;
  style?: CSSProperties;
}

const imageSizes = {
  small: { width: 48, height: 48 },
  large: { width: 112, height: 112 },
};

const UserImage = ({ src, style, size = 'small' }: Props) => {
  return (
    <StyledImage
      src={src ? src : `images/icon/user.svg`}
      alt="UserImage"
      width={imageSizes[size].width}
      height={imageSizes[size].height}
      style={style}
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
