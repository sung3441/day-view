import styled from 'styled-components';
import { pixelToRemUnit } from '@/shared/styles/util';
import { IconClose } from '@/public/images/icon';
import { memo } from 'react';
import { TMessage } from '@/shared/component/Organism/Snackbar/Snackbar';

const CloseButton = memo(({ onClick }: { onClick: () => void }) => {
  return (
    <IconButton onClick={onClick}>
      <IconClose
        width={pixelToRemUnit(24)}
        height={pixelToRemUnit(24)}
        color="#fff"
      />
    </IconButton>
  );
});

CloseButton.displayName = 'CloseButton';

const IconButton = styled.button`
  width: ${pixelToRemUnit(24)};
  height: ${pixelToRemUnit(24)};
  background: transparent;
  -webkit-tap-highlight-color: transparent;
  border: none;
  box-sizing: border-box;
`;

type props = {
  messages: TMessage[];
  handleClose: (id: string) => void;
};

const SnackbarUI = ({ messages, handleClose }: props) => {
  if (!messages?.length) return null;
  return (
    <Wrapper>
      <List>
        {messages?.map(({ id, message }) => (
          <Item id={id} key={id}>
            <p>{message}</p>
            <CloseButton onClick={() => handleClose(id)} />
          </Item>
        ))}
      </List>
    </Wrapper>
  );
};

export default SnackbarUI;

const Wrapper = styled.div`
  position: fixed;
  z-index: 10;
  left: 0;
  right: 0;
  bottom: 0;
`;

const List = styled.ul`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  margin: 0 auto;
`;

const Item = styled.li`
  border-radius: 14px;
  background: #797979;
  width: 344px;
  padding: ${pixelToRemUnit([18, 24])};
  margin-bottom: 16px;
  color: #fff;

  font-size: ${pixelToRemUnit(16)};
  font-weight: 700;

  display: flex;
  align-items: center;
  justify-content: space-between;

  transition: all 0.15s ease-out;

  & + .hide {
    transform: translateX(100vw);
    opacity: 0;
  }

  > p {
    width: calc(100% - ${pixelToRemUnit(30)});
    overflow-wrap: break-word;
    line-break: anywhere;
  }

  @media (max-width: 364px) {
    width: calc(100% - 20px);
  }
`;
