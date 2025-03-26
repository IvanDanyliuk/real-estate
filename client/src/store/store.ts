import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/auth/state/authApi';
import userReducer from '../features/users/state/userSlice';
import { userApi } from '../features/users/state/userApi';


export const store = configureStore({
  reducer: {
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
