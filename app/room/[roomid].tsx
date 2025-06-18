import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import DeviceCard from '../components/DeviceCard';
import FanSliderCard from '../components/FanSliderCard';
import { devicesByRoom } from '../../data/devicesByRoom';
import {
  applianceToggleMap,
  fanToggleAction,
  defaultToggleAction,
} from '../../utils/applianceFunctions'; 

interface DeviceState {
  isOn: boolean;
  speed?: number; // for fan type
}

export default function RoomScreen() {
  const { roomid } = useLocalSearchParams();
  const router = useRouter();
  const roomId = typeof roomid === 'string' ? roomid : roomid?.[0] || '';
  const roomDevices = devicesByRoom[roomId.toLowerCase()] || [];

  const [deviceStates, setDeviceStates] = useState<Record<string, DeviceState>>({});

  // Initialize default states for all room devices
  useEffect(() => {
    const initialStates: Record<string, DeviceState> = {};
    roomDevices.forEach((device) => {
      initialStates[device.name] = {
        isOn: false,
        ...(device.type === 'fan' && { speed: 0 }),
      };
    });
    setDeviceStates(initialStates);
  }, [roomId]);

  // Handle toggle on/off
const toggleDevice = (name: string) => {
  const current = deviceStates[name]?.isOn ?? false;
  const newIsOn = !current;

  // Update the state
  setDeviceStates((prev) => ({
    ...prev,
    [name]: {
      ...prev[name],
      isOn: newIsOn,
    },
  }));

  // 🔥 Call the mapped action with the new state
  const action = applianceToggleMap[name] || defaultToggleAction;
  action(name, newIsOn);
  console.log(name);
  //console.log(`🔌 ${name} toggled to ${newIsOn ? 'On' : 'Off'}`);
};


  // Handle fan slider change
  const changeSpeed = (name: string, value: number) => {
    if (!deviceStates[name]?.isOn) return; // prevent changes when device is off
    setDeviceStates((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        speed: value,
      },
    }));
    console.log(`🌪️ ${name} speed set to ${value}`);
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-14 pb-4 bg-white">
        <Feather name="arrow-left" size={24} onPress={() => router.back()} color="#1E1B4B" />
        <Text className="text-xl font-semibold text-indigo-900 capitalize">{roomId}</Text>
        <Feather name="user" size={24} onPress={() => router.push('/profile')} color="#1E1B4B" />
      </View>

      {/* Devices Section */}
      <View className="flex-1 bg-indigo-900 rounded-t-2xl px-6 pt-10 pb-10 mt-10">
        <Text className="text-white text-xl font-semibold mb-6">Devices</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {roomDevices.map((device) => {
            const state = deviceStates[device.name] || { isOn: false, speed: 0 };

            if (device.type === 'switch') {
              return (
                <DeviceCard
                  key={device.name}
                  name={device.name}
                  iconName={device.icon}
                  isOn={state.isOn}
                  onToggle={() => toggleDevice(device.name)}
                />
              );
            } else if (device.type === 'fan') {
              return (
                <FanSliderCard
                  key={device.name}
                  value={state.speed ?? 0}
                  isOn={state.isOn}
                  onToggle={() => toggleDevice(device.name)}
                  onChange={(val) => changeSpeed(device.name, val)}
                />
              );
            }

            return null;
          })}
        </ScrollView>
      </View>
    </View>
  );
}
