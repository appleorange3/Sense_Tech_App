import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStoredRooms = async () => {
  try {
    const json = await AsyncStorage.getItem('rooms');
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Failed to load rooms', e);
    return [];
  }
};

export const saveRoom = async (newRoom: any) => {
  try {
    const json = await AsyncStorage.getItem('rooms');
    const rooms = json ? JSON.parse(json) : [];
    rooms.push(newRoom);
    await AsyncStorage.setItem('rooms', JSON.stringify(rooms));
  } catch (e) {
    console.error('Failed to save room', e);
  }
};
