import { IStore } from '.';

export const selectLists = (state: IStore) => state.lists;
export const selectLocation = (state: IStore) => state.location;
export const selectActiveModal = (state: IStore) => state.activeModal;
