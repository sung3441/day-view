import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// https://kyounghwan01.github.io/blog/React/redux/redux-toolkit/#%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%84%82%E1%85%B3%E1%86%AB-%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%B2
interface UserType {
  userId: string;
  userTy: number;
  email: string;
  nickName: string;
}

const initialState: UserType = {
  userId: '',
  userTy: 0,
  email: '',
  nickName: '',
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initUser: () => ({ ...initialState }),
    setUser: (state, action: PayloadAction<UserType>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setUser, initUser } = slice.actions;

const userReducer = slice.reducer;
export default userReducer;
