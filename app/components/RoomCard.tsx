// components/RoomCard.tsx
import React from 'react';
import { Image, ImageSourcePropType, Text, TouchableOpacity } from 'react-native';

interface RoomCardProps {
  name: string;
  icon: ImageSourcePropType;
  onPress: () => void;
}


const RoomCard: React.FC<RoomCardProps> = ({ name, icon, onPress }) => {
  return (
    <TouchableOpacity
      className="w-[47%] aspect-square bg-white rounded-2xl mb-4 items-center justify-center"
      onPress={onPress}
    >
      <Image source={icon} className="w-14 h-14 mb-2" resizeMode="contain" />
      <Text className="text-sm text-gray-800 font-medium">{name}</Text>
    </TouchableOpacity>
  );
};

export default RoomCard;
