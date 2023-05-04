import React, { useRef } from 'react';
import styled from 'styled-components';

import { Inputbox, Icon } from '@/shared/component/Atom';
import { IconButton } from '@/shared/component/Molecule';

interface Props {
  placeholder?: string;
}

const SearchBar = ({ placeholder }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <DivStyle>
      <Icon type="search" />
      <Inputbox ref={inputRef} placeholder={placeholder} />
      <IconButton type="close" onClick={handleButtonClick} />
    </DivStyle>
  );
};

export default SearchBar;

const DivStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 415px;
  height: 56px;

  padding-left: 22px;
  padding-right: 10px;

  background: #ffffff;

  /* G_500 */
  border: 1px solid #999999;
  border-radius: 7px;
`;
