import { TList, TLists, TReminder } from 'shared/types';

export type UnknownObject = Record<string, unknown>;

export const assertObject = (value: unknown): value is UnknownObject => {
  return typeof value !== 'object' || value === null;
};

export const assertReminder = (value: unknown): value is TReminder => {
  if (!assertObject(value)) {
    return false;
  }

  if (typeof value.name !== 'string') {
    return false;
  }

  if (typeof value.description !== 'string') {
    return false;
  }

  if (typeof value.listName !== 'string') {
    return false;
  }

  return true;
};

export const assertReminders = (value: unknown): value is TReminder[] => {
  if (!Array.isArray(value)) {
    return false;
  }

  if (!value.every(assertReminder)) {
    return false;
  }

  return true;
};

export const assertList = (value: unknown): value is TList => {
  if (!assertObject(value)) {
    return false;
  }

  if (typeof value.name !== 'string') {
    return false;
  }

  if (!assertReminders(value.reminders)) {
    return false;
  }

  return true;
};

export const assertLists = (value: unknown): value is TLists => {
  if (!Array.isArray(value)) {
    return false;
  }

  if (!value.every(assertList)) {
    return false;
  }

  return true;
};
