// components/RoomCard.tsx
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';

interface RoomCardProps {
  name: string;
  icon: ImageSourcePropType;
  onPress: () => void;
  onDelete: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ name, icon, onPress, onDelete }) => {
  return (
    <View className="w-[47%] aspect-square relative">
      {/* Delete (minus) button */}
      <TouchableOpacity
        onPress={onDelete}
        className="absolute top-2 right-2 z-10"
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Feather name="minus-circle" size={20} color="#4B5563" />
      </TouchableOpacity>

      {/* Main card */}
      <TouchableOpacity
        className="flex-1 bg-white rounded-2xl items-center justify-center"
        onPress={onPress}
      >
        <Image source={icon} className="w-14 h-14 mb-6" resizeMode="contain" />
        <Text className="text-sm text-gray-600 font-medium">{name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RoomCard;
