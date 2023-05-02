import { Button } from '@/shared/component/Atom';
import { CSSProperties, SyntheticEvent } from 'react';
import Icon from '@/shared/component/Atom/Icon';

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

const defaultStyle: CSSProperties = {
  width: '40px',
  height: '40px',
  position: 'relative',
  pointerEvents: 'auto',
  backgroundColor: 'transparent',
};

interface Props {
  type: IconType;
  customStyle?: CSSProperties;
  onClick?: (e?: SyntheticEvent) => void;
}

const IconButton = ({ type, customStyle, onClick }: Props) => {
  return (
    <Button
      style={{ ...defaultStyle, ...customStyle }}
      onClick={onClick}
      aria-label={`${type} button`}
    >
      <Icon type={type} />
    </Button>
  );
};

export default IconButton;
