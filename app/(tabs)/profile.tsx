import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-14 pb-4 bg-white">
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#1E1B4B" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-indigo-900">Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Profile Body */}
      <View className="flex-1 bg-indigo-900 rounded-t-2xl px-6 pt-10 pb-10 mt-6">
        {/* Profile Picture */}
        <View className="items-center mb-6 relative">
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
            className="w-28 h-28 rounded-full border-4 border-white"
          />
          <TouchableOpacity className="absolute bottom-0 right-[35%] bg-white p-1 rounded-full">
            <Feather name="edit-2" size={16} color="#1E1B4B" />
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View className="items-center mb-10">
          <Text className="text-white text-xl font-semibold">Moin Shaikh</Text>
          <Text className="text-indigo-200 mt-1">moin@example.com</Text>
        </View>

        {/* Buttons */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 16 }}>
          <TouchableOpacity className="bg-white py-4 px-6 rounded-2xl flex-row items-center justify-between">
            <Text className="text-indigo-900 font-medium text-base">Edit Profile</Text>
            <Feather name="chevron-right" size={20} color="#1E1B4B" />
          </TouchableOpacity>

          <TouchableOpacity className="bg-white py-4 px-6 rounded-2xl flex-row items-center justify-between">
            <Text className="text-indigo-900 font-medium text-base">App Settings</Text>
            <Feather name="chevron-right" size={20} color="#1E1B4B" />
          </TouchableOpacity>

          <TouchableOpacity className="bg-white py-4 px-6 rounded-2xl flex-row items-center justify-between">
            <Text className="text-indigo-900 font-medium text-base">Connected Devices</Text>
            <Feather name="chevron-right" size={20} color="#1E1B4B" />
          </TouchableOpacity>

          <TouchableOpacity className="bg-red-100 py-4 px-6 rounded-2xl flex-row items-center justify-between mt-4">
            <Text className="text-red-500 font-medium text-base">Logout</Text>
            <AntDesign name="logout" size={20} color="#EF4444" />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
