import {
  createSlice,
  SliceCaseReducers,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import { TList, TReminder } from 'shared/types';
import { fetchValue, putValue, LISTS_KEY } from 'shared/api';
import { IStore } from 'store';
import { assertLists } from 'store/asserts';

export const fetchLists = createAsyncThunk(
  'lists/fetchLists',
  async (): Promise<unknown> => await fetchValue(LISTS_KEY)
);

const getLists = (getState: () => unknown) => (getState() as IStore).lists;

const saveLists = async (lists: TList[]): Promise<boolean> =>
  putValue<TList[]>(LISTS_KEY, lists);

export const addList = createAsyncThunk(
  'lists/addList',
  async (list: TList, { getState }): Promise<TList | null> => {
    const lists = [...getLists(getState), list];

    return (await saveLists(lists)) ? list : null;
  }
);

export const removeList = createAsyncThunk(
  'lists/removeList',
  async (list: TList, { getState }): Promise<TList | null> => {
    const lists = getLists(getState).filter(({ name }) => name !== list.name);

    return (await saveLists(lists)) ? list : null;
  }
);

export const addReminder = createAsyncThunk(
  'lists/addReminder',
  async (reminder: TReminder, { getState }): Promise<TReminder | null> => {
    const lists = getLists(getState).map((el) => {
      if (el.name !== reminder.listName) return el;

      return { ...el, reminders: el.reminders.concat(reminder) };
    });

    return (await saveLists(lists)) ? reminder : null;
  }
);

export const removeReminder = createAsyncThunk(
  'lists/removeReminder',
  async (reminder: TReminder, { getState }): Promise<TReminder | null> => {
    const lists = getLists(getState).map((el) => {
      if (el.name !== reminder.listName) return el;

      return {
        ...el,
        reminders: el.reminders.filter(({ name }) => name !== reminder.name),
      };
    });

    return (await saveLists(lists)) ? reminder : null;
  }
);

export const listsSlice = createSlice<TList[], SliceCaseReducers<TList[]>>({
  name: 'lists',
  initialState: [],
  extraReducers(builder) {
    builder.addCase(fetchLists.fulfilled, (state, { payload }) => {
      if (payload && assertLists(payload)) {
        return payload;
      }
    });

    builder.addCase(addList.fulfilled, (state, { payload }) => {
      if (payload) {
        state.push(payload);
      }
    });

    builder.addCase(removeList.fulfilled, (state, { payload }) => {
      if (payload) {
        state = state.filter(({ name }) => name !== payload.name);
      }
    });

    builder.addCase(addReminder.fulfilled, (state, { payload }) => {
      if (payload) {
        state
          .find((list) => list.name === payload.listName)
          ?.reminders.push(payload);
      }
    });

    builder.addCase(removeReminder.fulfilled, (state, { payload }) => {
      if (payload) {
        const list = state.find((list) => list.name === payload.listName);

        if (!list) return state;

        list.reminders = list?.reminders.filter(
          ({ name }) => name !== payload.name
        );
      }
    });
  },
  reducers: {},
});

export default listsSlice.reducer;
