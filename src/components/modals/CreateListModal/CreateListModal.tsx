import React, { FC, memo, useState } from 'react';
import {
  Button,
  FormItem,
  FormLayout,
  Input,
  ModalPage,
} from '@vkontakte/vkui';

import { addList } from 'store/slices/listsSlice';
import { useAppDispatch } from 'store';
import { setActiveModal } from 'store/slices/activeModalSlice';

interface ICreateListModal {
  id: string;
}

export const CreateListModal: FC<ICreateListModal> = memo(({ id }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>('');

  const onSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(addList({ name: name, reminders: [] })).then(() =>
      dispatch(setActiveModal(null))
    );
  };

  return (
    <ModalPage id={id}>
      <FormLayout onSubmit={onSubmit}>
        <FormItem top="Название списка">
          <Input
            type="text"
            name="name"
            value={name}
            onChange={({ target: { value } }) => setName(value)}
          />
        </FormItem>
        <FormItem>
          <Button size="l" stretched type="submit" disabled={!name}>
            Добавить
          </Button>
        </FormItem>
      </FormLayout>
    </ModalPage>
  );
});
