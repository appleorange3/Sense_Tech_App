// utils/deviceStorage.ts

import AsyncStorage from '@react-native-async-storage/async-storage';

export const getRoomDevices = async (roomId: string) => {
  try {
    const data = await AsyncStorage.getItem(`devices_${roomId}`);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error getting devices:', err);
    return [];
  }
};

export const saveRoomDevices = async (roomId: string, devices: any[]) => {
  try {
    await AsyncStorage.setItem(`devices_${roomId}`, JSON.stringify(devices));
  } catch (err) {
    console.error('Error saving devices:', err);
  }
};
