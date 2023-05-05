import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import { Inputbox, Icon } from '@/shared/component/Atom';
import { IconButton } from '@/shared/component/Molecule';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  width: 415px;
  height: 56px;

  padding-left: 22px;
  padding-right: 10px;

  background: #ffffff;

  /* G_500 */
  border: 1px solid #999999;
  border-radius: 7px;
`;
