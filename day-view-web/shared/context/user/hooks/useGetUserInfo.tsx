import { useQuery } from 'react-query';
import { QueryKeys } from '@/shared/queryClient';
import { getUser } from '@/shared/api';
import { UserRes } from '@/shared/types/api';
import { number } from 'prop-types';

type SelectFnc = (data: UserRes) => UserRes;

const initUser = {
  memberId: 0,
  provider: '',
  email: '',
  nickname: '',
  profileImageUrl: '',
  birthday: '',
  createdDate: 0,
  lastModifiedDate: 0,
};

const useGetUserInfo = (selectFnc?: SelectFnc) => {
  const res = useQuery([QueryKeys.USER], getUser, {
    select: (data) => {
      const res = data?.data;
      if (!res) return initUser;
      return selectFnc ? selectFnc(res) : res;
    },
  });

  return {
    ...res,
    data: selectFnc
      ? (res.data as ReturnType<SelectFnc>)
      : res.data || initUser,
  };
};

export default useGetUserInfo;
