export type TReminder = {
  name: string;
  description: string;
};

export type TList = {
  name: string;
  reminders: TReminder[];
};
