import styled from 'styled-components';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';

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

const Section = styled.section<{ gap?: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ gap }) => (gap ? `${gap}px` : '16px')};
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

const InvalidText = styled.div`
  ${getStyledThemProperty('fonts', 'caption3')}
  color: ${getStyledThemProperty('colors', 'Red')}
`;

const Wrapper = styled.div<{ gap?: number }>`
  display: flex;
  flex-direction: column;
  width: ${pixelToRemUnit(380)};
  gap: ${({ gap }) => gap && `${gap}px`};
`;

export {
  Header,
  Body,
  Section,
  Control,
  Title,
  SubTitle,
  Divider,
  InvalidText,
  Wrapper,
};
