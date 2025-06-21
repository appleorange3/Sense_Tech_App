import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getRoomDevices, saveRoomDevices } from '../../../utils/deviceStorage';

type Device = {
  type: 'fan' | 'switch';
  name: string;
  icon: string;
};

const deviceTemplates: Device[] = [
  {
    type: 'fan',
    name: 'Fan',
    icon: 'fan',
  },
  {
    type: 'switch',
    name: 'Tubelight',
    icon: 'lightbulb',
  },
];

export default function AddDeviceScreen() {
  const router = useRouter();
  const { roomid } = useLocalSearchParams();
  const roomId = typeof roomid === 'string' ? roomid : roomid?.[0] || '';

  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [deviceName, setDeviceName] = useState<string>('');

  const handleAddDevice = async () => {
    if (!selectedDevice || !deviceName.trim()) {
      Alert.alert('Missing Input', 'Please select a device type and enter a device name');
      return;
    }

    const newDevice: Device = {
      type: selectedDevice as 'fan' | 'switch',
      name: deviceName.trim(),
      icon: selectedDevice === 'fan' ? 'fan' : 'lightbulb',
    };

    const existingDevices: Device[] = await getRoomDevices(roomId);

    const fanCount = existingDevices.filter((d) => d.type === 'fan').length;
    const tubelightCount = existingDevices.filter((d) => d.type === 'switch').length;

    if (newDevice.type === 'fan' && fanCount >= 1) {
      Alert.alert('Limit Reached', 'Only 1 fan can be added to a room.');
      return;
    }

    if (newDevice.type === 'switch' && tubelightCount >= 4) {
      Alert.alert('Limit Reached', 'Only 4 tubelights can be added to a room.');
      return;
    }

    await saveRoomDevices(roomId, [...existingDevices, newDevice]);
    router.back();
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-14 pb-4 bg-white">
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#1E1B4B" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-indigo-900">Add Device</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <View className="flex-1 bg-indigo-900 rounded-t-2xl px-6 pt-10 mt-10">
        <Text className="text-white text-lg font-medium mb-6">Select Device</Text>

        <View className="flex-row flex-wrap gap-4 mb-8">
          {deviceTemplates.map((device) => (
            <TouchableOpacity
              key={device.type}
              className={`bg-white rounded-2xl p-6 items-center w-[48%] ${
                selectedDevice === device.type ? 'border-2 border-blue-400' : ''
              }`}
              onPress={() => {
                setSelectedDevice(device.type);
                setDeviceName(device.name);
              }}
            >
              <View className="w-16 h-16 bg-gray-100 rounded-full items-center justify-center mb-4">
                <MaterialCommunityIcons name={device.icon as any} size={32} color="#6B7280" />
              </View>
              <Text className="text-gray-700 font-medium text-center">
                {device.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="mb-8">
          <Text className="text-white text-lg font-medium mb-4">Device Name</Text>
          <TextInput
            className="bg-white rounded-2xl px-6 py-4 text-gray-700 text-base"
            placeholder="Enter Device Name"
            placeholderTextColor="#9CA3AF"
            value={deviceName}
            onChangeText={setDeviceName}
          />
        </View>

        <TouchableOpacity
          className={`rounded-2xl py-4 items-center ${
            selectedDevice && deviceName.trim() ? 'bg-white' : 'bg-gray-400'
          }`}
          onPress={handleAddDevice}
          disabled={!selectedDevice || !deviceName.trim()}
        >
          <Text
            className={`text-lg font-semibold ${
              selectedDevice && deviceName.trim()
                ? 'text-indigo-900'
                : 'text-gray-600'
            }`}
          >
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
