import { createContext, memo, ReactNode, useContext, useMemo } from 'react';
import Display from '@/shared/component/Organism/DropDown/Display';

type props = {
  children: ReactNode;
  selectedItem: string;
};

const Main = memo(({ children, selectedItem }: props) => {
  const a = '';

  const value = useMemo(() => {
    return { selectedItem };
  }, [selectedItem]);

  return (
    <DropDownContext.Provider value={value}>
      {children}
    </DropDownContext.Provider>
  );
});
업;

Main.displayName = 'DropDown';

type TDropDownContext = {
  selectedItem: string;
};

const DropDownContext = createContext<TDropDownContext>({
  selectedItem: '',
});
export const useDropDown = () => {
  const context = useContext(DropDownContext);
  if (context === undefined) {
    throw new Error('useDropDown must be used within a <Toggle />');
  }
  return context;
};

const DropDown = Object.assign(Main, {
  Display: Display,
});

export default DropDown;
