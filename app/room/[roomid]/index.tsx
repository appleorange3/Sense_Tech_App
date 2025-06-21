import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
    applianceToggleMap,
    defaultToggleAction
} from '../../../utils/applianceFunctions';
import { getRoomDevices } from '../../../utils/deviceStorage';
import DeviceCard from '../../components/DeviceCard';
import FanSliderCard from '../../components/FanSliderCard';

interface DeviceState {
  isOn: boolean;
  speed?: number;
}

interface Device {
  type: 'fan' | 'switch';
  name: string;
  icon: string;
}

export default function RoomScreen() {
  const { roomid } = useLocalSearchParams();
  const router = useRouter();
  const roomId = typeof roomid === 'string' ? roomid : roomid?.[0] || '';

  const [roomDevices, setRoomDevices] = useState<Device[]>([]);
  const [deviceStates, setDeviceStates] = useState<Record<string, DeviceState>>({});

  const loadDevices = useCallback(async () => {
    const devices: Device[] = await getRoomDevices(roomId);
    setRoomDevices(devices);

    const initialStates: Record<string, DeviceState> = {};
    devices.forEach((device) => {
      initialStates[device.name] = {
        isOn: false,
        ...(device.type === 'fan' && { speed: 0 }),
      };
    });
    setDeviceStates(initialStates);
  }, [roomId]);

  useFocusEffect(
    useCallback(() => {
      loadDevices();
    }, [loadDevices])
  );

  const toggleDevice = (name: string) => {
    const current = deviceStates[name]?.isOn ?? false;
    const newIsOn = !current;
    setDeviceStates((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        isOn: newIsOn,
      },
    }));
    const action = applianceToggleMap[name] || defaultToggleAction;
    action(name, newIsOn);
  };

  const changeSpeed = (name: string, value: number) => {
    if (!deviceStates[name]?.isOn) return;
    setDeviceStates((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        speed: value,
      },
    }));
  };

  const handleAddDevice = () => {
    router.push(`/room/${roomId}/adddevices`);
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-14 pb-4 bg-white">
        <Feather name="arrow-left" size={24} onPress={() => router.back()} color="#1E1B4B" />
        <Text className="text-xl font-semibold text-indigo-900 capitalize">{roomId}</Text>
        <Feather name="user" size={24} onPress={() => router.push('/profile')} color="#1E1B4B" />
      </View>
      
      {/* Content */}
      <View className="flex-1 bg-indigo-900 rounded-t-2xl px-6 pt-10 pb-10 mt-10">
        <View className="flex-row justify-center items-center mb-12">
          <Text className="text-white text-xl font-semibold mr-2">Devices</Text>
          <TouchableOpacity onPress={handleAddDevice}>
            <Feather name="plus-square" size={20} color="white" />
          </TouchableOpacity>
        </View>

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
