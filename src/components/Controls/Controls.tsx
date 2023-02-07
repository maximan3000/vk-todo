import { ButtonGroup, CellButton } from '@vkontakte/vkui';
import { FC, memo } from 'react';

import { structure } from 'shared/navigation';
import { useAppDispatch } from 'store';
import { setActiveModal } from 'store/slices/activeModalSlice';

import styles from './Controls.module.css';

interface IControls {
  hideAddListBtn?: boolean;
}

export const Controls: FC<IControls> = memo(({ hideAddListBtn }) => {
  const dispatch = useAppDispatch();

  return (
    <ButtonGroup mode="horizontal" stretched className={styles.Controls}>
      {hideAddListBtn && (
        <CellButton
          centered
          onClick={() =>
            dispatch(setActiveModal(structure.modals.CREATE_LIST_MODAL.id))
          }
          className={styles.ControlsBtnLeft}
        >
          Добавить список
        </CellButton>
      )}
      <CellButton
        centered
        onClick={() =>
          dispatch(setActiveModal(structure.modals.CREATE_REMINDER_MODAL.id))
        }
        className={styles.ControlsBtnRight}
      >
        Добавить напоминание
      </CellButton>
    </ButtonGroup>
  );
});

Controls.displayName = 'Controls';
Controls.defaultProps = {
  hideAddListBtn: false,
};
