import {
  Action,
  configureStore,
  EnhancedStore,
  Store,
  ThunkAction,
} from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { createWrapper, MakeStore } from "next-redux-wrapper";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import userReducer from "@/redux/userReducer";
import calendarReducer from "@/redux/calendarReducer";
// config 작성
const persistConfig = {
  key: "root", // localStorage key
  storage, // localStorage
  // whiteList:[]
  // persist 리듀서에서 제외할 리듀서
  blacklist: ["calendar"],
};

// 합치고 싶은 리듀서를 선언해준다
const combinedReducer = combineReducers({
  user: userReducer,
  calendar: calendarReducer,
});

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

  // redux logger
  // .concat(logger),
  // devTools: process.env.NEXT_PUBLIC_NODE_ENV !== 'production',
});

const setupStore = (context: any): EnhancedStore => store;
const makeStore: MakeStore<any> = (context: any) => setupStore(context);

export const wrapper = createWrapper<Store>(makeStore);

export const persistor = persistStore(store); // persist store 내보내기

// 타입스크립트 타입관련
// https://redux-toolkit.js.org/usage/usage-with-typescript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
// export const useAppDispatch: () => AppDispatch = useDispatch; //
