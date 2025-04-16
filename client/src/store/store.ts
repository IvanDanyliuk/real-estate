import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/state/userSlice';
import { authApi } from '../features/auth/state/authApi';
import { userApi } from '../features/users/state/userApi';
import { propertyApi } from '../features/properties/state/propertyApi';
import { blogApi } from '../features/blog/state/blogApi';


export const store = configureStore({
  reducer: {
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [propertyApi.reducerPath]: propertyApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      propertyApi.middleware,
      blogApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
