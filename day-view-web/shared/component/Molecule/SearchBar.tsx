import { ChangeEvent, CSSProperties, useRef, useState } from 'react';
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
  // input event를 위해 필요
  const inputRef = useRef<HTMLInputElement>(null);
  const handleButtonClick = () => setValue('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <DivStyle style={customStyle}>
      <Icon
        type="sm_search"
        height={40}
        width={40}
        style={{ marginRight: '5px' }}
      />
      <Inputbox
        type="search"
        maxLength={20}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        ref={inputRef}
      />
      {!value && (
        <IconButton
          type="close"
          onClick={handleButtonClick}
          isActiveFnc={false}
          height={40}
          width={40}
        />
      )}
    </DivStyle>
  );
};

export default SearchBar;

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
