import React, { FC, memo, useState } from 'react';
import {
  Button,
  FormItem,
  FormLayout,
  CustomSelect,
  Input,
} from '@vkontakte/vkui';
import { TList, TReminder } from '../../shared/types';

interface IReminderCreator {
  lists: TList[];
  addReminder: (reminder: TReminder, parentListName: string) => void;
}

export const ReminderCreator: FC<IReminderCreator> = memo(
  ({ addReminder, lists }) => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [listName, setListName] = useState<string>('');

    const onSubmit = () => {
      addReminder({ name: name, description: description }, listName);
    };

    return (
      <FormLayout onSubmit={onSubmit}>
        <FormItem top="Напоминание">
          <Input
            type="text"
            name="name"
            value={name}
            onChange={({ target: { value } }) => setName(value)}
          />
        </FormItem>
        <FormItem top="Заметка">
          <Input
            type="text"
            name="description"
            value={description}
            onChange={({ target: { value } }) => setDescription(value)}
          />
        </FormItem>
        <FormItem top="В список:">
          <CustomSelect
            name="listName"
            value={listName}
            options={lists.map(({ name }) => ({ label: name, value: name }))}
            onChange={({ target: { value } }) => setListName(value)}
          />
        </FormItem>
        <FormItem>
          <Button size="l" stretched type="submit">
            Добавить
          </Button>
        </FormItem>
      </FormLayout>
    );
  }
);
