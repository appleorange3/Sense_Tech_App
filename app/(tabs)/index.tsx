import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import RoomCard from '../components/RoomCard';
import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { rooms } from '../../data/rooms'; // your list of room objects

export default function DashboardScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: 'none' },
    });
  }, [navigation]);

 const handleRoomPress = (roomName: string) => {
  const id = roomName.toLowerCase().replace(/\s+/g, '');
  console.log('Navigating to room with id:', id); // ✅ See if this logs
  router.push(`/room/${id}`);
};


  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-14 pb-4 bg-white">
        <TouchableOpacity>
          <Feather name="arrow-left" size={24} color="#1E1B4B" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-indigo-900">Home</Text>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Feather name="user" size={24} color="#1E1B4B" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View className="flex-1 bg-indigo-900 rounded-t-2xl px-6 pt-10 pb-10 mt-20">
        <View className="flex-row justify-center items-center mb-12">
          <Text className="text-white text-xl font-semibold mr-2">Rooms</Text>
          <TouchableOpacity>
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
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
