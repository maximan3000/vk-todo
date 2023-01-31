import React, { FC, memo } from 'react';
import {
  Group,
  Cell,
  Panel,
  PanelHeader,
  ButtonGroup,
  CellButton,
  PanelHeaderBack,
  ContentCard,
} from '@vkontakte/vkui';

import { removeReminder } from '../../store/slices/listsSlice';
import { useAppDispatch, useAppSelector } from '../../store';
import { selectLocation, selectLists } from '../../store/selectors';
import { navigate } from '../../store/slices/locationSlice';
import { paths, structure } from '../../shared/navigation';
import { setActiveModal } from '../../store/slices/activeModalSlice';

interface IRemindersPanel {
  id: string;
}

export const RemindersPanel: FC<IRemindersPanel> = memo(({ id }) => {
  const dispatch = useAppDispatch();
  const location = useAppSelector(selectLocation);
  const lists = useAppSelector(selectLists);
  const listName = location.params;
  const list = lists.find((list) => list.name === listName);

  return (
    <Panel id={id}>
      <PanelHeader
        before={
          <PanelHeaderBack
            onClick={() => dispatch(navigate(paths.root.lists))}
          />
        }
      >
        {list && list.name}
      </PanelHeader>
      <Group>
        {list?.reminders.map((reminder) => (
          <Cell
            key={reminder.name}
            mode="removable"
            onRemove={() => dispatch(removeReminder(reminder))}
          >
            <ContentCard
              header={reminder.name}
              caption={reminder.description}
            />
          </Cell>
        ))}
      </Group>
      <Group>
        <ButtonGroup mode="horizontal" stretched>
          <CellButton centered hidden disabled></CellButton>
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
