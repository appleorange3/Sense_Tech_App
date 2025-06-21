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

// ✅ New: deleteRoomFromStorage
export const deleteRoomFromStorage = async (roomId: string) => {
  try {
    // Get existing rooms
    const json = await AsyncStorage.getItem('rooms');
    if (json) {
      const rooms = JSON.parse(json);
      const updatedRooms = rooms.filter((room: any) => room.id !== roomId);

      // Save updated list
      await AsyncStorage.setItem('rooms', JSON.stringify(updatedRooms));
    }

    // Delete associated devices
    await AsyncStorage.removeItem(`devices_${roomId}`);
  } catch (e) {
    console.error('Failed to delete room and its devices:', e);
  }
};
