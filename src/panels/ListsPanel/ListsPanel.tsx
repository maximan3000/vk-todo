import React, { FC, memo } from 'react';
import {
  Group,
  List,
  Cell,
  Panel,
  PanelHeader,
  ButtonGroup,
  CellButton,
} from '@vkontakte/vkui';

import { selectLists } from '../../store/selectors';
import { removeList } from '../../store/slices/listsSlice';
import { navigate } from '../../store/slices/locationSlice';
import { setActiveModal } from '../../store/slices/activeModalSlice';
import store, { useAppDispatch, useAppSelector } from '../../store';
import { paths, structure } from '../../shared/navigation';

interface IListsPanel {
  id: string;
}

export const ListsPanel: FC<IListsPanel> = memo(({ id }) => {
  const dispatch = useAppDispatch();
  const lists = useAppSelector(selectLists);

  return (
    <Panel id={id}>
      <PanelHeader>Мои списки</PanelHeader>
      <Group>
        <List>
          {lists &&
            lists.map((list) => (
              <Cell
                key={list.name}
                mode="removable"
                onRemove={() => dispatch(removeList(list))}
              >
                <CellButton
                  onClick={() =>
                    dispatch(navigate(`${paths.root.reminders}:${list.name}`))
                  }
                >
                  {list.name}
                </CellButton>
              </Cell>
            ))}
        </List>
      </Group>
      <Group>
        <ButtonGroup mode="horizontal" stretched>
          <CellButton
            centered
            onClick={() =>
              dispatch(setActiveModal(structure.modals.CREATE_LIST_MODAL.id))
            }
          >
            Добавить список
          </CellButton>
          <CellButton
            centered
            onClick={() =>
              dispatch(
                setActiveModal(structure.modals.CREATE_REMINDER_MODAL.id)
              )
            }
          >
            Добавить напоминание
          </CellButton>
        </ButtonGroup>
      </Group>
    </Panel>
  );
});
