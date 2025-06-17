import React from 'react';
import { View, Text, Switch, Platform } from 'react-native';
import { MotiView } from 'moti';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

interface DeviceCardProps {
  name: string;
  iconName?: string; // e.g. 'air-conditioner', 'lightbulb-outline'
  isOn: boolean;
  onToggle: () => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({
  name,
  iconName = 'lightbulb-outline',
  isOn,
  onToggle,
}) => {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'spring', damping: 12, stiffness: 120 }}
      className={`rounded-2xl px-5 py-4 mb-4 flex-row justify-between items-center shadow-xl ${
        isOn ? 'bg-white/90' : 'bg-indigo-100/50'
      }`}
      style={{
        shadowColor: isOn ? '#6366F1' : '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 6,
      }}
    >
      <View className="flex-row items-center space-x-3">
        <MaterialCommunityIcons
  name={iconName as keyof typeof MaterialCommunityIcons.glyphMap}
  size={28}
  color="#4F46E5"
/>

        <Text className="text-indigo-900 font-semibold text-lg tracking-wide">{name}</Text>
      </View>
      <Switch
        value={isOn}
        onValueChange={onToggle}
        trackColor={{ false: '#D1D5DB', true: '#4F46E5' }}
        thumbColor={Platform.OS === 'android' ? '#fff' : undefined}
      />
    </MotiView>
  );
};

export default DeviceCard;
