import { useRouter } from 'next/router';

const Name = () => {
  const { query } = useRouter();
  console.log(query);

  return <div>로그인 처리중입니다.</div>;
};

export default Name;
