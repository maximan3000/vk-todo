import bridge from '@vkontakte/vk-bridge';

export const putValue = async <T>(key: string, value: T): Promise<void> => {
  try {
    const data = await bridge.send('VKWebAppStorageSet', {
      key: key,
      value: JSON.stringify(value),
    });
    if (!data.result)
      throw { message: `VKWebAppStorageSet cant add key ${key}` };
    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchValue = async <T>(key: string): Promise<T> => {
  try {
    const data = await bridge.send('VKWebAppStorageGet', {
      keys: [key],
    });
    if (!data.keys) throw { message: `VKWebAppStorageGet no key ${key}` };
    const jsonValue = data.keys.find((entry) => entry.key === key)?.value;
    if (!jsonValue)
      throw { message: `VKWebAppStorageGet key ${key} contains empty value` };
    return JSON.parse(jsonValue) as T;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
