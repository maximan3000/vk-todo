import React, { FC, memo, useState } from 'react';
import {
  Button,
  FormItem,
  FormLayout,
  CustomSelect,
  Input,
  ModalPage,
} from '@vkontakte/vkui';

import { addReminder } from 'store/slices/listsSlice';
import { useAppSelector, useAppDispatch } from 'store';
import { selectLists, selectLocation } from 'store/selectors';
import { setActiveModal } from 'store/slices/activeModalSlice';

interface ICreateReminderModal {
  id: string;
}

export const CreateReminderModal: FC<ICreateReminderModal> = memo(({ id }) => {
  const dispatch = useAppDispatch();
  const location = useAppSelector(selectLocation);
  const listNameFixed = location.params;

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [listName, setListName] = useState<string>(listNameFixed || '');

  const lists = useAppSelector(selectLists);

  const onSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(addReminder({ name, description, listName })).then(() =>
      dispatch(setActiveModal(null))
    );
  };

  return (
    <ModalPage id={id}>
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
            disabled={!!listNameFixed}
            value={listName}
            options={lists.map(({ name }) => ({ label: name, value: name }))}
            onChange={({ target: { value } }) => setListName(value)}
          />
        </FormItem>
        <FormItem>
          <Button
            size="l"
            stretched
            type="submit"
            disabled={!name || !listName}
          >
            Добавить
          </Button>
        </FormItem>
      </FormLayout>
    </ModalPage>
  );
});
