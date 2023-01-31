import bridge from '@vkontakte/vk-bridge';

export const LISTS_KEY = 'LISTS_KEY';

export const putValue = async <T>(key: string, value: T): Promise<boolean> => {
  try {
    const data = await bridge.send('VKWebAppStorageSet', {
      key: key,
      value: JSON.stringify(value),
    });
    if (!data.result) return false;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const fetchValue = async (key: string): Promise<unknown | null> => {
  try {
    const data = await bridge.send('VKWebAppStorageGet', {
      keys: [key],
    });
    if (!data.keys) return null;
    const jsonValue = data.keys.find((entry) => entry.key === key)?.value;
    if (!jsonValue) return null;
    return JSON.parse(jsonValue);
  } catch (error) {
    console.log(error);
    return null;
  }
};
