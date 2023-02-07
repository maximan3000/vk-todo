import { Cell, CellButton } from '@vkontakte/vkui';
import { FC, memo } from 'react';
import { paths } from 'shared/navigation';
import { TList } from 'shared/types';
import { useAppDispatch } from 'store';
import { removeList } from 'store/slices/listsSlice';
import { navigate } from 'store/slices/locationSlice';

interface IListCell {
  list: TList;
}

export const ListCell: FC<IListCell> = memo(({ list }) => {
    const dispatch = useAppDispatch();
    
  return (
    <Cell
      key={list.name}
      mode="removable"
      onRemove={() => dispatch(removeList(list))}
    >
      <CellButton
        onClick={() =>
          dispatch(navigate(`${paths.root.reminders}:${list.name}`))
        }
      >
        {list.name}
      </CellButton>
    </Cell>
  );
});
