import { useRouter } from 'next/router';
import {useEffect} from "react";

const Index = () => {
  const { query } = useRouter();

  useEffect(() => {
    console.log("query",query)
  }, [query]);


  return <div>로그인 처리중입니다.</div>;
};

export default Index;
