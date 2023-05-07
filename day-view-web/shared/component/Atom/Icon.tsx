import Image from 'next/image';
import styled from 'styled-components';

export type IconType =
  | 'close'
  | 'left'
  | 'menu'
  | 'right'
  | 'search'
  | 'select'
  | 'trash'
  | 'user'
  | 'write';

interface Props {
  type: IconType;
}

const Icon = ({ type }: Props) => {
  return (
    <Image
      src={`images/middleIcon/${type}.svg`}
      width={40}
      height={40}
      alt={type}
    />
  );
};

export default Icon;

const Wrap = styled.div`
  position: relative;
`;
