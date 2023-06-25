import { memo } from 'react';
import useGetSearch from '@/component/calendar/searchResult/useGetSearch';

const SearchResult = () => {
  const { data } = useGetSearch();
  console.log(data);
  return null;
};

export default memo(SearchResult);
