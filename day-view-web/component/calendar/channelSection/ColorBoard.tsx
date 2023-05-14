import { memo } from 'react';
import styled from 'styled-components';
import { Icon } from '@/shared/component/Atom';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';
import useOuterClick from '../../../shared/hooks/useOuterClick';

const rbgInfo = {
  Ellipse_25: 'rgb(173, 20, 87)',
  Ellipse_26: 'rgba(213, 0, 0)',
  Ellipse_27: 'rgba(216, 27, 96)',
  Ellipse_28: 'rgba(255, 131, 109)',

  Ellipse_30: 'rgba(244, 81, 30)',
  Ellipse_32: 'rgba(239, 108, 0)',
  Ellipse_31: 'rgba(240, 147, 0)',
  Ellipse_33: 'rgba(255, 199, 74)',

  Ellipse_35: 'rgba(228, 196, 65)',
  Ellipse_39: 'rgba(192, 202, 51)',
  Ellipse_37: 'rgba(124, 179, 66)',
  Ellipse_41: 'rgba(39, 183, 111)',

  Ellipse_36: 'rgba(11, 128, 67)',
  Ellipse_40: 'rgba(0, 150, 136)',
  Ellipse_38: 'rgba(3, 155, 229)',
  Ellipse_42: 'rgba(66, 133, 244)',

  Ellipse_45: 'rgba(63, 81, 181)',
  Ellipse_47: 'rgba(121, 134, 203)',
  Ellipse_46: 'rgba(179, 157, 219)',
  Ellipse_48: 'rgba(158, 105, 175)',

  Ellipse_49: 'rgba(142, 36, 170)',
  Ellipse_51: 'rgba(121, 85, 72)',
  Ellipse_50: 'rgba(97, 97, 97)',
  Ellipse_52: 'rgba(167, 155, 142)',
};

interface Props {
  closeColorBoard: () => void;
  isShow: boolean;
}

const ColorBoard = ({ isShow, closeColorBoard }: Props) => {
  const colors = Object.entries(rbgInfo);
  const ref = useOuterClick<HTMLDivElement>({
    callback: closeColorBoard,
    isFlag: isShow,
  });

  return (
    <Box ref={ref}>
      <BoxTitle>
        <Icon type="sm_config" iconSize="sm" />
        <span>관리</span>
      </BoxTitle>
      <ColorWrap>
        {colors.map(([key, value]) => (
          <ColorCircle key={key} rgb={value} />
        ))}
      </ColorWrap>
    </Box>
  );
};

export default memo(ColorBoard);

const Box = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 55555;
  width: 140px;

  border: 1px solid rgba(219, 219, 219, 1);
  border-radius: 11px;
  background-color: #fff;
`;

const BoxTitle = styled.div`
  border-bottom: 1px solid #D9D9D9;
  padding: ${pixelToRemUnit(10)};

  ${getStyledThemProperty('box', 'flexBetweenBox')};
  > span {
    margin-left: ${pixelToRemUnit(7)};
    ${getStyledThemProperty('fonts', 'caption3')};
`;

const ColorWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  padding: ${pixelToRemUnit(10)};
  gap: 12px;
`;

const ColorCircle = styled.span<{ rgb: string }>`
  // width: ${pixelToRemUnit(20)};
  // height: ${pixelToRemUnit(20)};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ rgb }) => rgb};

  :hover {
    transform: scale(1.1);
  }
`;
