import { Icon } from '@/shared/component/Atom';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';
import { useState } from 'react';
import styled from 'styled-components';

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  // ? TODO
  // 1) list 따로 : children, object.assign
  // 2) css 코드정리, 반응형 rem
  // 3) 마우스 hover
  // 4) 클릭하면 select 변경

  return (
    <Wrapper>
      <Select
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        최신순
        <Icon
          type="right"
          style={{
            transform: 'rotate(90deg)',
            padding: '10px',
          }}
        ></Icon>
      </Select>
      {isOpen && (
        <Ul>
          <Li>최신순</Li>
          <Li>오래된순</Li>
          <Li>구독자수</Li>
        </Ul>
      )}
    </Wrapper>
  );
};

export default DropDown;

const Wrapper = styled.div`
  width: ${pixelToRemUnit(128)};
  font: ${getStyledThemProperty('fonts', 'caption2')};
`;

const Select = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: ${pixelToRemUnit(40)};

  padding: ${pixelToRemUnit([0, 20, 0, 10])};

  border: 1px solid ${getStyledThemProperty('colors', 'G_300')};
  border-radius: 7px;

  position: relative;

  cursor: pointer;
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;

  padding: ${pixelToRemUnit([10, 18])};
  gap: 10px;

  border: 1px solid ${getStyledThemProperty('colors', 'G_700')};
  border-radius: 7px;
  list-style: none;

  position: absolute;
  top: ${pixelToRemUnit(126)};

  cursor: pointer;
`;

const Li = styled.li`
  display: flex;
  align-items: center;

  min-width: ${pixelToRemUnit(92)};
  height: ${pixelToRemUnit(32)};

  white-space: nowrap;
`;
