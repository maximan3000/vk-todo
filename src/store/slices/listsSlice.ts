import {
  createSlice,
  SliceCaseReducers,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import { TList, TLists, TReminder } from 'shared/types';
import { fetchValue, putValue, LISTS_KEY } from 'shared/api';
import { IStore } from '..';
import { assertLists } from 'store/asserts';

export const listsSlice = createSlice<TLists, SliceCaseReducers<TLists>>({
  name: 'lists',
  initialState: [],
  extraReducers(builder) {
    builder.addMatcher(
      (action) => action.type.endsWith('/fulfilled'),
      (state, { payload }) => {
        if (payload) return payload;
      }
    );
  },
  reducers: {},
});

export const fetchLists = createAsyncThunk(
  'lists/fetchLists',
  async (): Promise<TLists> => {
    const value = await fetchValue(LISTS_KEY);

    return assertLists(value) ? value : [];
  }
);

export const addList = createAsyncThunk(
  'lists/addList',
  async (list: TList, { getState }): Promise<TLists> => {
    const { lists } = getState() as IStore;

    const _lists = JSON.parse(JSON.stringify(lists)) as TLists;

    _lists.push(list);

    const result = await putValue<TLists>(LISTS_KEY, _lists);
    if (result) return _lists;
    return [];
  }
);

export const removeList = createAsyncThunk(
  'lists/removeList',
  async (list: TList, { getState }): Promise<TLists> => {
    const { lists } = getState() as IStore;

    const _lists: TLists = JSON.parse(JSON.stringify(lists)) as TLists;

    const listIndex = _lists.findIndex(({ name }) => name === list.name);
    if (listIndex === -1) return [];
    _lists.splice(listIndex, 1);

    const result = await putValue<TLists>(LISTS_KEY, _lists);
    if (result) return _lists;
    return [];
  }
);

export const addReminder = createAsyncThunk(
  'lists/addReminder',
  async (reminder: TReminder, { getState }): Promise<TLists> => {
    const { lists } = getState() as IStore;

    const _lists: TLists = JSON.parse(JSON.stringify(lists)) as TLists;

    const list = _lists.find(({ name }) => name === reminder.listName);
    if (!list) return [];
    list.reminders.push(reminder);

    const result = await putValue<TLists>(LISTS_KEY, _lists);
    if (result) return _lists;
    return [];
  }
);

export const removeReminder = createAsyncThunk(
  'lists/removeReminder',
  async (reminder: TReminder, { getState }): Promise<TLists> => {
    const { lists } = getState() as IStore;

    const _lists: TLists = JSON.parse(JSON.stringify(lists)) as TLists;

    const list = _lists.find(({ name }) => name === reminder.listName);
    if (!list) return [];
    const reminderIndex = list.reminders.findIndex(
      ({ name }) => name === reminder.name
    );
    if (reminderIndex === -1) return [];
    list.reminders.splice(reminderIndex, 1);

    const result = await putValue<TLists>(LISTS_KEY, _lists);
    if (result) return _lists;
    return [];
  }
);

export default listsSlice.reducer;
