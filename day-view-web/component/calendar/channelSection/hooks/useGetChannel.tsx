import { ChannelSelectType } from '@/shared/types/api';
import { useQuery } from 'react-query';
import { QueryKeys } from '@/shared/queryClient';
import { getChannel, getUser } from '@/shared/api';
import { isLoginAtom } from '@/shared/atom/global';
import { useRecoilValue } from 'recoil';

type Props = { selectType: ChannelSelectType };

const useGetChannel = ({ selectType }: Props) => {
  const isLogin = useRecoilValue(isLoginAtom);

  const result = useQuery(
    [QueryKeys.CHANNEL, selectType],
    () => getChannel(selectType),
    {
      enabled: isLogin,
    }
  );

  return result;
};

export default useGetChannel;
