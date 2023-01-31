import { structure } from '../../shared/navigation';

import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';

export const activeModalSlice = createSlice<
  string | null,
  SliceCaseReducers<string | null>
>({
  name: 'activeModal',
  initialState: null,
  reducers: {
    setActiveModal: (state, { payload }: PayloadAction<string>) => {
      const modalIds = Object.values(structure.modals).map(({ id }) => id);
      if (payload && modalIds.includes(payload)) return payload;
      return null;
    },
  },
});

export const { setActiveModal } = activeModalSlice.actions;

export default activeModalSlice.reducer;
