// export const sessionStorage =
//   typeof window === 'undefined' ? undefined : window.sessionStorage;

// export const localStorage =
//   typeof window === 'undefined' ? undefined : window.localStorage;

// https://tech.osci.kr/2022/07/05/recoil-react-js-state-management/
const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    if (typeof window === undefined) return undefined;
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) setSelf(JSON.parse(savedValue));

    onSet((newValue: any, _: any, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

const sessionStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    if (typeof window === undefined) return undefined;
    const savedValue = sessionStorage.getItem(key);
    if (savedValue !== null) setSelf(JSON.parse(savedValue));

    onSet((newValue: any, _: any, isReset: any) => {
      const confirm = newValue.length === 0;
      confirm
        ? sessionStorage.removeItem(key)
        : sessionStorage.setItem(key, JSON.stringify(newValue));
    });
  };
