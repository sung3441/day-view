import Image from 'next/image';

export type IconType =
  | 'close'
  | 'left'
  | 'menu'
  | 'right'
  | 'search'
  | 'select'
  | 'trash'
  | 'user'
  | 'write'
  | 'sm_close'
  | 'sm_config'
  | 'sm_more'
  | 'sm_plus'
  | 'sm_trash'
  | 'sm_up';

export type IconSize = keyof typeof defaultIconSizes;

export const defaultIconSizes = {
  sm: { width: 28, height: 28 },
  mid: { width: 40, height: 40 },
};

interface Props {
  type: IconType;
  iconSize: IconSize;
}

const Icon = ({ type, iconSize = 'mid' }: Props) => {
  const sizes = defaultIconSizes[iconSize];

  return (
    <Image src={`images/${iconSize}_Icon/${type}.svg`} alt={type} {...sizes} />
  );
};

export default Icon;
