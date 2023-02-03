export type TReminder = {
  name: string;
  description: string;
  listName: string;
};

export type TList = {
  name: string;
  reminders: TReminder[];
};

export type TLists = TList[];

export type TNavigation = {
  view: string;
  panel: string;
  params: string;
};
