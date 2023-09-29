import { useRecoilValue } from 'recoil';
import { memo } from 'react';
import { TabType } from '@/shared/component/Organism/Gnb/state';
import { isMobileViewAtom } from '@/shared/atom/global';
import DropDownTab from '@/shared/component/Organism/Gnb/DropDownTab';
import NormalTab from '@/shared/component/Organism/Gnb/NormalTab';

const tabList: TabType[] = ['월', '일정', '카테고리'];

const Tab = () => {
  const isMobileView = useRecoilValue(isMobileViewAtom);

  return (
    <>
      {isMobileView ? (
        <DropDownTab tabList={tabList} />
      ) : (
        <NormalTab tabList={tabList} />
      )}
    </>
  );
};

export default memo(Tab);
