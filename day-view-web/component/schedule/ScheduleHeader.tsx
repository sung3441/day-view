import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { selectedYYMMAtom } from '@/state/calendar';
import { getStyledThemProperty, pixelToRemUnit } from '@/shared/styles/util';

interface Props {}

const ScheduleHeader = ({}: Props) => {
  const selectedYYMM = useRecoilValue(selectedYYMMAtom);

  return (
    <Wrap>
      <div>
        {selectedYYMM.year}년 {selectedYYMM.month}월
      </div>
      &nbsp; - &nbsp;
      <div>
        {selectedYYMM.year}년 {selectedYYMM.month}월
      </div>
    </Wrap>
  );
};

export default ScheduleHeader;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  ${getStyledThemProperty('layout', 'pageHeader')};
  ${getStyledThemProperty('fonts', 'title1')};
`;
