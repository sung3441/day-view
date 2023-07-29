import { ChannelSelectType } from '@/shared/types/api';
import { useQuery } from 'react-query';
import { QueryKeys } from '@/shared/queryClient';
import { getChannel } from '@/shared/api';
import { isLoginAtom } from '@/shared/atom/global';
import { useRecoilValue } from 'recoil';

type Props = { selectType: ChannelSelectType };

const useGetChannel = ({ selectType }: Props) => {
  const isLogin = useRecoilValue(isLoginAtom);

  return useQuery(
    [QueryKeys.CHANNEL, selectType],
    () => getChannel(selectType),
    {
      enabled: isLogin,
      select: (data) => data!.data,
    }
  );
};

export default useGetChannel;
