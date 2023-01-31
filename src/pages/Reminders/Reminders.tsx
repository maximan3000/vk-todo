import React, { FC, memo } from 'react';
import {
  Group,
  List,
  Cell,
  View,
  Panel,
  PanelHeader,
  Header,
  ButtonGroup,
  CellButton,
  PanelHeaderBack,
} from '@vkontakte/vkui';
import { useNavigate, useParams } from 'react-router';
import { TList } from '../../shared/types';
import { CREATE_REMINDER_MODAL } from '../../shared/consts';
import { paths } from '../../shared/paths';

interface IReminders {
  lists: TList[];
  setActiveModal: (modal: string) => void;
  removeReminder: (reminderName: string, listName: string) => void;
}

export const Reminders: FC<IReminders> = memo(
  ({ lists, setActiveModal, removeReminder }) => {
    const navigate = useNavigate();
    const { listName } = useParams();
    const list = lists.find(({ name }) => name === listName);

    return (
      <View activePanel="reminders">
        <Panel id="reminders">
          <PanelHeader
            before={<PanelHeaderBack onClick={() => navigate(paths.root())} />}
          >
            Напоминания
          </PanelHeader>
          <Group header={<Header>{listName}</Header>}>
            {list?.reminders.map(({ name, description }) => (
              <Cell
                key={name}
                mode="removable"
                onRemove={() => removeReminder(name, list.name)}
              >
                {name}
              </Cell>
            ))}
          </Group>
          <Group>
            <ButtonGroup mode="horizontal" stretched>
              <CellButton centered hidden disabled></CellButton>
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
