import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { TNavigation } from 'shared/types';
import { TList } from 'shared/types';

import listsReducer from './slices/listsSlice';
import locationReducer from './slices/locationSlice';
import activeModalSlice from './slices/activeModalSlice';

export interface IStore {
  lists: TList[];
  location: TNavigation;
  activeModal: string | null;
}

const store = configureStore({
  reducer: combineReducers({
    lists: listsReducer,
    location: locationReducer,
    activeModal: activeModalSlice,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
