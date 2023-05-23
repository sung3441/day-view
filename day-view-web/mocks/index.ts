import { useSetRecoilState } from 'recoil';
import { mswStatusAtom } from '@/shared/atom/global';
import { SetupWorker } from 'msw';
import { useEffect } from 'react';

let worker: null | Promise<{ worker: SetupWorker }> = null;

if (typeof window === 'undefined') {
  const server = import('./server');
  server.then((s) => {
    s.server.listen();
  });
} else {
  worker = import('./browser');
}

const useMswStatus = () => {
  const setMswStatus = useSetRecoilState(mswStatusAtom);

  useEffect(() => {
    if (typeof window !== 'undefined' && worker) {
      worker.then((w) => {
        w.worker.start().then(() => setMswStatus('browser'));
      });
    }
  }, []);
};

export default useMswStatus;
