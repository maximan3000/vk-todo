import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';

import { TNavigation } from 'shared/types';
import { ROOT_PATH, parsePath } from 'shared/navigation';

export const locationSlice = createSlice<
  TNavigation,
  SliceCaseReducers<TNavigation>
>({
  name: 'location',
  initialState: parsePath(ROOT_PATH),
  reducers: {
    navigate: (state, { payload }: PayloadAction<string>) => {
      return parsePath(payload);
    },
  },
});

export const { navigate } = locationSlice.actions;

export default locationSlice.reducer;
