import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { selectedYYMMAtom } from '@/state/calendar';

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
  ${({ theme }) => theme.fonts.title1}
  display: flex;
`;
