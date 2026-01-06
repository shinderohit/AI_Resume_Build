
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error retrieving ${key}:`, error);
    return null;
  }
};

export const clearData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error clearing ${key}:`, error);
  }
};
