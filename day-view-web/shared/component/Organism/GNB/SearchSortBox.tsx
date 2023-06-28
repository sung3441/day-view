import { ChangeEvent, memo } from 'react';
import { Select } from '@/shared/component/Atom';
import {
  G_searchOrderOptionAtom,
  SearchOrderType,
} from '@/shared/component/Organism/GNB/state';
import { useRecoilState } from 'recoil';

const selectOptions: {
  value: SearchOrderType;
  name: '최신순' | '오래된순' | '구독자순';
}[] = [
  { name: '최신순', value: 'RECENT' },
  { name: '오래된순', value: 'OLD' },
  { name: '구독자순', value: 'SUBSCRIBER' },
];
const SearchSortBox = () => {
  const [sort, setSort] = useRecoilState(G_searchOrderOptionAtom);

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value as SearchOrderType);
  };

  return (
    <Select value={sort} onChange={onChange}>
      {selectOptions.map(({ name, value }) => (
        <option key={value} value={value}>
          {name}
        </option>
      ))}
    </Select>
  );
};

export default memo(SearchSortBox);
