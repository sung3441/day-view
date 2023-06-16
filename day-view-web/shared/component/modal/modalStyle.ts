import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

const Body = styled.div<{ gap?: number }>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => (gap ? `${gap}px` : '22px')};
`;

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const Control = styled.section`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 17px;

  width: 100%;
`;

const Title = styled.h2`
  ${({ theme }) => theme.fonts.title2};
  color: ${({ theme }) => theme.colors.Black};
`;

const SubTitle = styled.div`
  ${({ theme }) => theme.fonts.caption2};
  color: ${({ theme }) => theme.colors.G_700};
`;

const Divider = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 2px;
  left: 50%;
  background: #dbdbdb;
`;

export { Header, Body, Section, Control, Title, SubTitle, Divider };
