import React, { FC, useEffect } from 'react';
import {
  AppRoot,
  ModalRoot,
  Root,
  SplitCol,
  SplitLayout,
  View,
} from '@vkontakte/vkui';

import ListsPanel from 'panels/ListsPanel';
import RemindersPanel from 'panels/RemindersPanel';
import { useAppDispatch, useAppSelector } from 'store';
import { fetchLists } from 'store/slices/listsSlice';
import { structure } from 'shared/navigation';
import { selectLocation, selectActiveModal } from 'store/selectors';
import CreateReminderModal from 'modals/CreateReminderModal';
import CreateListModal from 'modals/CreateListModal';
import { setActiveModal } from 'store/slices/activeModalSlice';

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const location = useAppSelector(selectLocation);
  const activeModal = useAppSelector(selectActiveModal);

  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  return (
    <AppRoot>
      <SplitLayout
        modal={
          <ModalRoot
            activeModal={activeModal}
            onClose={() => dispatch(setActiveModal(null))}
          >
            <CreateListModal id={structure.modals.CREATE_LIST_MODAL.id} />
            <CreateReminderModal
              id={structure.modals.CREATE_REMINDER_MODAL.id}
            />
          </ModalRoot>
        }
      >
        <SplitCol width={'100%'} maxWidth={'100%'} animate>
          <Root activeView={location.view}>
            <View activePanel={location.panel} id={structure.ROOT_VIEW.id}>
              <ListsPanel id={structure.ROOT_VIEW.panels.LISTS_PANEL.id} />
              <RemindersPanel
                id={structure.ROOT_VIEW.panels.REMINDERS_PANEL.id}
              />
            </View>
          </Root>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  );
};
