import React, { FC, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ModalPage, ModalRoot, SplitLayout } from '@vkontakte/vkui';

import Lists from '../../pages/Lists';
import Reminders from '../../pages/Reminders';
import { CREATE_LIST_MODAL, CREATE_REMINDER_MODAL } from '../../types';

import styles from './App.module.css';
import ListCreator from '../ListCreator';

export const App: FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const modal = (
    <ModalRoot activeModal={activeModal} onClose={() => setActiveModal(null)}>
      <ModalPage size="l" settlingHeight={90} id={CREATE_LIST_MODAL}>
        <ListCreator />
      </ModalPage>
      <ModalPage id={CREATE_REMINDER_MODAL}>create reminder</ModalPage>
    </ModalRoot>
  );

  return (
    <SplitLayout modal={modal}>
      <BrowserRouter>
        <Routes>
          <Route element={<Lists setActiveModal={setActiveModal} />} path="/" />
          <Route
            element={<Reminders setActiveModal={setActiveModal} />}
            path="/qwe"
          />
        </Routes>
      </BrowserRouter>
    </SplitLayout>
  );
};
