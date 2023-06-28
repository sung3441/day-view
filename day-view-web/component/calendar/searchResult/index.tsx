import { memo } from 'react';
import useGetSearch from '@/component/calendar/searchResult/hooks/useGetSearch';

const SearchResult = () => {
  const { data } = useGetSearch();
  return null;
};

export default memo(SearchResult);
