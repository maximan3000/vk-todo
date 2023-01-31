import React, { FC, useState } from 'react';
import { Button, FormItem, FormLayout, Input } from '@vkontakte/vkui';

export const ListCreator: FC = () => {
  const [name, setName] = useState<string>('');

  return (
    <FormLayout onSubmit={() => alert()}>
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
};
