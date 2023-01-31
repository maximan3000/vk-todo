import React, { FC, memo } from 'react';
import {
  Group,
  List,
  Cell,
  View,
  Panel,
  PanelHeader,
  ButtonGroup,
  CellButton,

  Link,
} from '@vkontakte/vkui';

import { TList } from '../../shared/types';
import { CREATE_LIST_MODAL, CREATE_REMINDER_MODAL } from '../../shared/consts';
import { paths } from '../../shared/paths';

interface ILists {
  lists: TList[];
  setActiveModal: (modal: string) => void;
  removeList: (listName: string) => void;
}

export const Lists: FC<ILists> = memo(
  ({ setActiveModal, lists, removeList }) => {
    return (
      <View activePanel="lists">
        <Panel id="lists">
          <PanelHeader>Мои списки</PanelHeader>
          <Group>
            <List>
              {lists.map((list) => (
                <Cell
                  key={list.name}
                  mode="removable"
                  onRemove={() => removeList(list.name)}
                >
                  <Link href={paths.list(list.name)}>{list.name}</Link>
                </Cell>
              ))}
            </List>
          </Group>
          <Group>
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
          </Group>
        </Panel>
      </View>
    );
  }
);
