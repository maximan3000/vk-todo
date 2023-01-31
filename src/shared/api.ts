import bridge from '@vkontakte/vk-bridge';

export const putValue = async <T>(key: string, value: T): Promise<void> => {
  try {
    const data = await bridge.send('VKWebAppStorageSet', {
      key: key,
      value: JSON.stringify(value),
    });
    if (!data.result) return;
    return;
  } catch (error) {
    console.log(error);
  }
};

export const fetchValue = async <T>(key: string): Promise<T | undefined> => {
  try {
    const data = await bridge.send('VKWebAppStorageGet', {
      keys: [key],
    });
    if (!data.keys) return;
    const jsonValue = data.keys.find((entry) => entry.key === key)?.value;
    if (!jsonValue) return;
    return JSON.parse(jsonValue) as T;
  } catch (error) {
    console.log(error);
  }
};
