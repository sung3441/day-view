import { KeyboardEvent, CSSProperties, useRef, memo } from 'react';
import styled from 'styled-components';

import { Inputbox, Icon } from '@/shared/component/Atom';
import { IconButton } from '@/shared/component/Molecule';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';
import { SetterOrUpdater } from 'recoil';

interface Props {
  value: string;
  setValue: SetterOrUpdater<string>;
  placeholder?: string;
  customStyle?: CSSProperties;
}

const SearchBar = ({ value, setValue, placeholder, customStyle }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleCloseClick = () => {
    if (!inputRef.current) return;
    inputRef.current.value = '';
    setValue(inputRef.current.value);
  };

  const handleClick = () => {
    if (!inputRef.current) return;
    setValue(inputRef.current.value);
  };

  const handleKeyup = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleClick();
  };

  return (
    <DivStyle style={customStyle}>
      <IconButton
        type="sm_search"
        height={40}
        width={40}
        style={{ marginRight: '5px' }}
        onClick={handleClick}
      />
      <Inputbox
        type="text"
        maxLength={20}
        placeholder={placeholder}
        ref={inputRef}
        onKeyUp={handleKeyup}
        // value={value}
        // onChange={handleChange}
      />
      {!!value && (
        <IconButton
          type="close"
          onClick={handleCloseClick}
          isActiveFnc={false}
          height={40}
          width={40}
        />
      )}
    </DivStyle>
  );
};

export default memo(SearchBar);

const DivStyle = styled.div`
  display: flex;
  align-items: center;

  width: ${pixelToRemUnit(415)};
  height: ${pixelToRemUnit(56)};

  padding-left: ${pixelToRemUnit(22)};
  padding-right: ${pixelToRemUnit(10)};

  background: ${getStyledThemProperty('colors', 'White')};
  border: 1px solid ${getStyledThemProperty('colors', 'G_500')};
  border-radius: 7px;
`;
