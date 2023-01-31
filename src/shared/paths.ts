export const paths = {
  root: () => '/',
  list: (listName?: string) =>
    listName ? `/list/${listName}` : '/list/:listName',
};
