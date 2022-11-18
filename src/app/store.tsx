import { configureStore } from '@reduxjs/toolkit'
import rootreducer from './rootReduces';
import logger from 'redux-logger';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: rootreducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend().concat(logger),

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Áp dụng`useDispatch` and `useSelector` cho toàn bộ ứng dụng
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;