import React, { FC, memo, useState } from 'react';
import { Button, FormItem, FormLayout, Input } from '@vkontakte/vkui';
import { TList } from '../../shared/types';

interface IListCreator {
  addList: (list: TList) => void;
}

export const ListCreator: FC<IListCreator> = memo(({ addList }) => {
  const [name, setName] = useState<string>('');

  const onSubmit = () => {
    addList({ name: name, reminders: [] });
  };

  return (
    <FormLayout onSubmit={onSubmit}>
      <FormItem top="Название списка" bottom={name}>
        <Input
          type="text"
          name="name"
          value={name}
          onChange={({ target: { value } }) => setName(value)}
        />
      </FormItem>
      <FormItem>
        <Button size="l" stretched type="submit">
          Добавить
        </Button>
      </FormItem>
    </FormLayout>
  );
});
