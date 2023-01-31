import React, { FC } from 'react';
import { Group, List, Cell, View, Panel, PanelHeader } from '@vkontakte/vkui';

interface IReminders {
  setActiveModal: (modal: string) => void;
}

export const Reminders: FC<IReminders> = () => {
  return (
    <View activePanel="list">
      <Panel id="list">
        <PanelHeader>Напоминания</PanelHeader>
      </Panel>
    </View>
  );
};
