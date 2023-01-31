import React, { FC, useState } from 'react';
import {
  Group,
  List,
  Cell,
  View,
  Panel,
  PanelHeader,
  Footer,
  FixedLayout,
  ButtonGroup,
  CellButton,
} from '@vkontakte/vkui';

import { CREATE_LIST_MODAL, CREATE_REMINDER_MODAL } from '../../types';

interface List {
  name: string;
  id: number;
}

const listsMock = [
  {
    id: 1,
    name: 'Первый список',
  },
  {
    id: 2,
    name: 'Второй список',
  },
  {
    id: 3,
    name: 'Третий список',
  },
];

interface ILists {
  setActiveModal: (modal: string) => void;
}

export const Lists: FC<ILists> = ({ setActiveModal }) => {
  const [lists, setLists] = useState<List[]>(listsMock);

  return (
    <View activePanel="list">
      <Panel id="list">
        <PanelHeader>Мои списки</PanelHeader>
        <Group>
          <List>
            {lists.map((list) => (
              <Cell key={list.id}>{list.name}</Cell>
            ))}
          </List>
        </Group>
        <FixedLayout vertical="bottom">
          <ButtonGroup mode="horizontal" stretched>
            <CellButton
              centered
              onClick={() => setActiveModal(CREATE_LIST_MODAL)}
            >
              Добавить список
            </CellButton>
            <CellButton
              centered
              onClick={() => setActiveModal(CREATE_REMINDER_MODAL)}
            >
              Добавить напоминание
            </CellButton>
          </ButtonGroup>
        </FixedLayout>
      </Panel>
    </View>
  );
};
