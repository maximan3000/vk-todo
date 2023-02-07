import { FC, memo } from 'react';
import { Group, Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

import { useAppDispatch, useAppSelector } from 'store';
import { selectLocation, selectLists } from 'store/selectors';
import { navigate } from 'store/slices/locationSlice';
import { paths } from 'shared/navigation';

import Controls from 'components/Controls';
import ReminderCell from 'components/ReminderCell';

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
          <ReminderCell reminder={reminder} />
        ))}
      </Group>
      <Group>
        <Controls hideAddListBtn />
      </Group>
    </Panel>
  );
});

RemindersPanel.displayName = 'RemindersPanel';
