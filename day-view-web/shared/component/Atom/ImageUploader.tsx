import { memo, CSSProperties } from 'react';
import styled from 'styled-components';
import { pixelToRemUnit } from '@/shared/styles/util';

interface Props {
  style?: CSSProperties;
}

const ImageUploader = ({ ...props }: Props) => {
  return <Upload {...props}>{AddIcon}</Upload>;
};

export default memo(ImageUploader);

const Upload = styled.div`
  width: ${pixelToRemUnit(80)};
  height: ${pixelToRemUnit(80)};
`;

const S = {};

const AddIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="currentValue"
    height="currentValue"
    viewBox="0 0 80 80"
    fill="none"
  >
    <rect width="80" height="80" rx="7" fill="#F3F3F3" />
    <rect x="31" y="39" width="18" height="2" fill="#999999" />
    <rect
      x="41"
      y="31"
      width="18"
      height="2"
      transform="rotate(90 41 31)"
      fill="#999999"
    />
  </svg>
);
