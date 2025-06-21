// app/(tabs)/index.tsx or app/home.tsx depending on your folder structure
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { deleteRoomFromStorage, getStoredRooms } from '../../utils/storage'; // ✅ Make sure these exist
import RoomCard from '../components/RoomCard';

interface Room {
  id: string;
  name: string;
  icon: any;
}

export default function HomeScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [rooms, setRooms] = useState<Room[]>([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: 'none' },
    });
  }, [navigation]);

  useEffect(() => {
    const loadRooms = async () => {
      const savedRooms = await getStoredRooms();
      setRooms(savedRooms);
    };

    const unsubscribe = navigation.addListener('focus', loadRooms);
    return unsubscribe;
  }, [navigation]);

  const handleRoomPress = (roomName: string) => {
    const roomId = roomName.toLowerCase().replace(/\s+/g, '');
    console.log('Navigating to room with id:', roomId);
    router.push(`/room/${roomId}`);
  };

  const handleDeleteRoom = (roomId: string, roomName: string) => {
    Alert.alert(
      'Delete Room',
      `Are you sure you want to delete "${roomName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteRoomFromStorage(roomId);
            const updatedRooms = rooms.filter(r => r.id !== roomId);
            setRooms(updatedRooms);
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-14 pb-4 bg-white">
        <TouchableOpacity>
          <Feather name="arrow-left" size={24} color="#1E1B4B" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-indigo-900">Home</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
          <Feather name="user" size={24} color="#1E1B4B" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View className="flex-1 bg-indigo-900 rounded-t-2xl px-6 pt-10 pb-10 mt-20">
        <View className="flex-row justify-center items-center mb-12">
          <Text className="text-white text-xl font-semibold mr-2">Rooms</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/addrooms')}>
            <Feather name="plus-square" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
          <View className="flex-row flex-wrap justify-between gap-x-4 gap-y-4">
            {rooms.map((room, index) => (
              <RoomCard
                key={index}
                name={room.name}
                icon={room.icon}
                onPress={() => handleRoomPress(room.name)}
                onDelete={() => handleDeleteRoom(room.id, room.name)}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
