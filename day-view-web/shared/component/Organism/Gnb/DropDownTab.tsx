import { memo } from 'react';
import DropDown from '@/shared/component/Organism/DropDown';
import { useRecoilState } from 'recoil';
import { G_tabAtom, TabType } from '@/shared/component/Organism/Gnb/state';

type Props = {
  tabList: TabType[];
};

const DropDownTab = ({ tabList }: Props) => {
  const [tab, setTab] = useRecoilState(G_tabAtom);
  const handleTabClick = (label: TabType) => {
    setTab(label);
  };
  return (
    <DropDown selectedItem={tab}>
      <DropDown.Display />
      <DropDown.List>
        {tabList.map((label) => (
          <DropDown.ListItem onClick={() => handleTabClick(label)} key={label}>
            {label}
          </DropDown.ListItem>
        ))}
      </DropDown.List>
    </DropDown>
  );
};

export default memo(DropDownTab);
