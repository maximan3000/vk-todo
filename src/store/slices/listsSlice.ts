import {
  createSlice,
  SliceCaseReducers,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import { TList, TLists, TReminder } from '../../shared/types';
import { fetchValue, putValue, LISTS_KEY } from '../../shared/api';
import { IStore } from '..';

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
  async (): Promise<TLists | null> => {
    const value = await fetchValue(LISTS_KEY);
    const lists: TLists = [];
    if (!Array.isArray(value)) return null;
    if (value.length <= 0) return [];
    if (!value[0].name || !value[0].reminders) return null;
    return Object.assign(lists, value);
  }
);

export const addList = createAsyncThunk(
  'lists/addList',
  async (list: TList, { getState }): Promise<TLists> => {
    const { lists } = getState() as IStore;

    const _lists: TLists = [];
    Object.assign(_lists, JSON.parse(JSON.stringify(lists)));

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

    const _lists: TLists = [];
    Object.assign(_lists, JSON.parse(JSON.stringify(lists)));

    const listIndex = _lists.findIndex(({ name }) => name === list.name);
    if (listIndex === -1) return [];
    const updatedLists = _lists.splice(listIndex, 1);

    const result = await putValue<TLists>(LISTS_KEY, _lists);
    if (result) return _lists;
    return [];
  }
);

export const addReminder = createAsyncThunk(
  'lists/addReminder',
  async (reminder: TReminder, { getState }): Promise<TLists> => {
    const { lists } = getState() as IStore;

    const _lists: TLists = [];
    Object.assign(_lists, JSON.parse(JSON.stringify(lists)));

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

    const _lists: TLists = [];
    Object.assign(_lists, JSON.parse(JSON.stringify(lists)));

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
