import { useState } from 'react';
import styled, { css } from 'styled-components';
import { fadeIn, fadeOut } from '@/shared/styles/keyframes';
import { useOuterClick } from '@/shared/hooks';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';
import { Icon } from '@/shared/component/Atom';

interface Props {
  item: string[];
}

const DropDown = ({ item }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const [list, setList] = useState(item[0]);

  const ref = useOuterClick<HTMLDivElement>({
    callback: () => setIsOpen(false),
  });

  return (
    <Wrapper ref={ref}>
      <Select
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {list}
        <Icon
          type="right"
          style={{ transform: 'rotate(90deg)', padding: '10px' }}
        />
      </Select>
      {isOpen && (
        <Ul isOpen={isOpen}>
          {item.map((v, i) => (
            <Li
              key={i}
              onClick={() => {
                setList(v);
                setIsOpen(false);
              }}
            >
              {v}
            </Li>
          ))}
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

  padding: ${pixelToRemUnit([0, 10])};

  border: 1px solid ${getStyledThemProperty('colors', 'G_300')};
  border-radius: 7px;

  position: relative;

  cursor: pointer;
`;

const Ul = styled.ul<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;

  width: ${pixelToRemUnit(128)};

  padding: ${pixelToRemUnit([10, 0])};
  gap: 10px;

  border: 1px solid ${getStyledThemProperty('colors', 'G_700')};
  border-radius: 7px;
  list-style: none;

  position: absolute;
  top: ${pixelToRemUnit(126)};

  cursor: pointer;

  ${({ isOpen }) =>
    isOpen
      ? css`
          animation: ${fadeIn} 0.15s ease-in-out 0s forwards;
        `
      : css`
          animation: ${fadeOut} 0.15s ease-in-out 0s forwards;
        `}
`;

const Li = styled.li`
  display: flex;
  align-items: center;

  min-width: ${pixelToRemUnit(92)};
  height: ${pixelToRemUnit(32)};

  padding: ${pixelToRemUnit(10)};

  white-space: nowrap;

  &:hover {
    background-color: #eee;
  }
`;
