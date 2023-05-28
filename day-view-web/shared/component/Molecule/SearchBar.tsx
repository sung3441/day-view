import { ChangeEvent, useRef, useState } from 'react';
import styled from 'styled-components';

import { Inputbox, Icon } from '@/shared/component/Atom';
import { IconButton } from '@/shared/component/Molecule';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';

interface Props {
  placeholder?: string;
}

const SearchBar = ({ placeholder }: Props) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      setIsEmpty(true);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsEmpty(e.target.value === '');
  };

  return (
    <DivStyle>
      <Icon type="search" />
      <Inputbox
        ref={inputRef}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {!isEmpty && <IconButton type="close" onClick={handleButtonClick} />}
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
