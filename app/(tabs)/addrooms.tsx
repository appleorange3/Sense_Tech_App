import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { roomTemplates } from '../../data/roomTemplates';
import { saveRoom } from '../../utils/storage';

export interface RoomTemplate {
  id: string;
  name: string;
  icon: ImageSourcePropType | string;
}

export default function AddRoomScreen() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<RoomTemplate | null>(null);
  const [roomName, setRoomName] = useState('');
  const [isCustomName, setIsCustomName] = useState(false); // ✅ Track manual name changes

  const handleTemplateSelect = (template: RoomTemplate) => {
    setSelectedTemplate(template);
    if (!isCustomName) {
      setRoomName(template.name); // ✅ Update only if user hasn't typed a custom name
    }
  };

  const handleAddRoom = async () => {
    if (!selectedTemplate) {
      Alert.alert('Error', 'Please select a room template');
      return;
    }

    if (!roomName.trim()) {
      Alert.alert('Error', 'Please enter a room name');
      return;
    }

    const newRoom = {
      id: roomName.toLowerCase().replace(/\s+/g, ''),
      name: roomName.trim(),
      icon: selectedTemplate.icon,
    };

    try {
      await saveRoom(newRoom);

      Alert.alert('Success', `Room "${roomName}" has been added successfully!`, [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.error('Error saving room:', error);
      Alert.alert('Error', 'Failed to save the room');
    }
  };

  const renderTemplateCard = (template: RoomTemplate) => {
    const isSelected = selectedTemplate?.id === template.id;
    const isImage = typeof template.icon !== 'string';

    return (
      <TouchableOpacity
        key={template.id}
        className={`bg-white rounded-2xl p-6 mr-6 min-w-[180px] items-center justify-center ${
          isSelected ? 'border-2 border-indigo-500' : ''
        }`}
        style={{
          width: 290,
          height: 320,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
        onPress={() => handleTemplateSelect(template)}
      >
        <View className="items-center justify-center flex-1">
          {isImage ? (
            <Image
              source={template.icon as ImageSourcePropType}
              style={{ width: 70, height: 76, resizeMode: 'contain' }}
            />
          ) : (
            <Feather
              name={template.icon as any}
              size={70}
              color={isSelected ? '#4F46E5' : '#6B7280'}
            />
          )}

          <Text
            className={`text-center mt-12 font-medium ${
              isSelected ? 'text-indigo-600' : 'text-gray-700'
            }`}
          >
            {template.name}
          </Text>
        </View>

        {isSelected && (
          <View className="absolute top-2 right-2">
            <View className="bg-indigo-500 rounded-full p-1">
              <Feather name="check" size={12} color="white" />
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-14 pb-4 bg-white">
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#1E1B4B" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-indigo-900">Add Rooms</Text>
        <View className="w-6" />
      </View>

      {/* Main Content */}
      <View className="flex-1 bg-indigo-900 rounded-t-2xl px-6 pt-10 pb-10 mt-20">
        {/* Select Template Section */}
        <View className="mb-8">
          <Text className="text-white text-xl font-semibold mb-6">Select Template</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {roomTemplates.map(template => renderTemplateCard(template))}
          </ScrollView>
        </View>

        {/* Room Name Section */}
        <View className="mb-8">
          <Text className="text-white text-xl font-semibold mb-4">Room Name</Text>
          <TextInput
            className="bg-white rounded-2xl px-6 py-4 text-gray-700 text-base"
            placeholder="Enter Room Name"
            placeholderTextColor="#9CA3AF"
            value={roomName}
            onChangeText={(text) => {
              setRoomName(text);
              setIsCustomName(true); // ✅ Mark as manually edited
            }}
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          />
        </View>

        {/* Add Button */}
        <View className="flex-1 justify-end">
          <TouchableOpacity
            className={`rounded-2xl py-4 items-center ${
              selectedTemplate && roomName.trim() ? 'bg-white' : 'bg-gray-300'
            }`}
            onPress={handleAddRoom}
            disabled={!selectedTemplate || !roomName.trim()}
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Text
              className={`text-xl font-semibold ${
                selectedTemplate && roomName.trim() ? 'text-indigo-900' : 'text-gray-500'
              }`}
            >
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
