import Image from 'next/image';
import { CSSProperties, memo } from 'react';
import styled from 'styled-components';

type SizeType = 'small' | 'large';

interface Props {
  src: string;
  size?: SizeType;
  style?: CSSProperties;
  width?: number;
  height?: number;
}

const imageSizes = {
  small: { width: 48, height: 48 },
  large: { width: 112, height: 112 },
};

const UserImage = ({ src, style, width, height, size = 'small' }: Props) => {
  return (
    <StyledImage
      src={src ? src : `images/icon/user.svg`}
      alt="UserImage"
      width={width ? width : imageSizes[size].width}
      height={height ? height : imageSizes[size].height}
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
