import Image from 'next/image';

type IconType =
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
