import { TNavigation } from './types';

export const structure = {
  ROOT_VIEW: {
    id: 'ROOT_VIEW',
    panels: {
      LISTS_PANEL: {
        id: 'LISTS_PANEL',
      },
      REMINDERS_PANEL: {
        id: 'REMINDERS_PANEL',
      },
    },
  },
  modals: {
    CREATE_LIST_MODAL: {
      id: 'CREATE_LIST_MODAL',
    },
    CREATE_REMINDER_MODAL: {
      id: 'CREATE_REMINDER_MODAL',
    },
  },
};

export const paths = {
  root: {
    lists: `${structure.ROOT_VIEW.id}/${structure.ROOT_VIEW.panels.LISTS_PANEL.id}`,
    reminders: `${structure.ROOT_VIEW.id}/${structure.ROOT_VIEW.panels.REMINDERS_PANEL.id}`,
  },
};

export const ROOT_PATH = paths.root.lists;

export const parsePath = (path: string): TNavigation => {
  const [view, panel, params] = path.split(/[/:]/);
  return { view, panel, params };
};
