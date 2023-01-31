import React, { FC, useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ModalPage, ModalRoot, SplitLayout } from '@vkontakte/vkui';

import Lists from '../../pages/Lists';
import Reminders from '../../pages/Reminders';
import { TList, TReminder } from '../../shared/types';

import ListCreator from '../ListCreator';
import { paths } from '../../shared/paths';
import {
  CREATE_LIST_MODAL,
  CREATE_REMINDER_MODAL,
  LISTS_KEY,
} from '../../shared/consts';
import { fetchValue, putValue } from '../../shared/api';
import ReminderCreator from '../ReminderCreator';

export const App: FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [lists, setLists] = useState<TList[]>([]);

  const updateLists = useCallback(
    (updatedLists: TList[]) => {
      putValue<TList[]>(LISTS_KEY, updatedLists).then(() =>
        setLists(updatedLists)
      );
    },
    [setLists]
  );

  useEffect(() => {
    fetchValue<TList[]>(LISTS_KEY).then((lists) => setLists(lists));
  }, []);

  const addList = useCallback(
    (list: TList) => {
      const updatedLists = lists.concat(list);
      updateLists(updatedLists);
    },
    [lists]
  );

  const removeList = useCallback(
    (listName: string) => {
      const updatedLists = JSON.parse(JSON.stringify(lists)) as TList[];
      const listIndex = updatedLists.findIndex(({ name }) => name === listName);
      if (listIndex) updatedLists.splice(listIndex, 1);
      updateLists(updatedLists);
    },
    [lists]
  );

  const addReminder = useCallback(
    (reminder: TReminder, listName: string) => {
      const updatedLists = JSON.parse(JSON.stringify(lists)) as TList[];
      const list = updatedLists.find(({ name }) => name === listName);
      list?.reminders.push(reminder);
      updateLists(updatedLists);
    },
    [lists]
  );

  const removeReminder = useCallback(
    (reminderName: string, listName: string) => {
      const updatedLists = JSON.parse(JSON.stringify(lists)) as TList[];
      const list = updatedLists.find(({ name }) => name === listName);
      const reminderIndex = list?.reminders.findIndex(
        ({ name }) => name === reminderName
      );
      if (reminderIndex) list?.reminders.splice(reminderIndex, 1);
      updateLists(updatedLists);
    },
    [lists]
  );

  const modal = (
    <ModalRoot activeModal={activeModal} onClose={() => setActiveModal(null)}>
      <ModalPage id={CREATE_LIST_MODAL}>
        <ListCreator addList={addList} />
      </ModalPage>
      <ModalPage id={CREATE_REMINDER_MODAL}>
        <ReminderCreator addReminder={addReminder} lists={lists} />
      </ModalPage>
    </ModalRoot>
  );

  return (
    <SplitLayout modal={modal}>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <Lists
                setActiveModal={setActiveModal}
                lists={lists}
                removeList={removeList}
              />
            }
            path={paths.root()}
          />
          <Route
            element={
              <Reminders
                setActiveModal={setActiveModal}
                lists={lists}
                removeReminder={removeReminder}
              />
            }
            path={paths.list()}
          />
        </Routes>
      </BrowserRouter>
    </SplitLayout>
  );
};
