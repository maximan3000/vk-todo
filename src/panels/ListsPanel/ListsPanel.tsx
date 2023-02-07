import { FC, memo } from 'react';
import { Group, List, Panel, PanelHeader } from '@vkontakte/vkui';

import { selectLists } from 'store/selectors';
import { useAppSelector } from 'store';

import Controls from 'components/Controls';
import ListCell from 'components/ListCell';

interface IListsPanel {
  id: string;
}

export const ListsPanel: FC<IListsPanel> = memo(({ id }) => {
  const lists = useAppSelector(selectLists);

  return (
    <Panel id={id}>
      <PanelHeader>Мои списки</PanelHeader>
      <Group>
        <List>{lists && lists.map((list) => <ListCell list={list} />)}</List>
      </Group>
      <Group>
        <Controls />
      </Group>
    </Panel>
  );
});

ListsPanel.displayName = 'ListsPanel';
