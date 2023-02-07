import { FC, memo } from 'react';
import { Cell, ContentCard } from '@vkontakte/vkui';
import { useAppDispatch } from 'store';
import { removeReminder } from 'store/slices/listsSlice';
import { TReminder } from 'shared/types';

interface IReminderCell {
  reminder: TReminder;
}

export const ReminderCell: FC<IReminderCell> = memo(({ reminder }) => {
  const dispatch = useAppDispatch();

  return (
    <Cell
      key={reminder.name}
      mode="removable"
      onRemove={() => dispatch(removeReminder(reminder))}
    >
      <ContentCard header={reminder.name} caption={reminder.description} />
    </Cell>
  );
});

ReminderCell.displayName = 'ReminderCell';
