import { createContext, useContext } from 'react';

type TDropDownContext = {
  isOpen: boolean;
  selectedItem: string;
  toggleDropDown: () => void;
};

export const DropDownContext = createContext<TDropDownContext | null>(null);

const useDropDown = () => {
  const context = useContext(DropDownContext);
  if (!context) {
    throw new Error('useDropDown must be used within a <Toggle />');
  }
  return context;
};

export default useDropDown;
