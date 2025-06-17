import React from 'react';
import { View, Text, Switch, Dimensions, Platform } from 'react-native';
import Slider from '@react-native-community/slider';
import { Feather } from '@expo/vector-icons';
import Animated, {
  FadeInUp,
  FadeOutDown,
  Layout,
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface FanSliderCardProps {
  value: number;
  onChange: (val: number) => void;
  isOn: boolean;
  onToggle: () => void;
}

const FanSliderCard: React.FC<FanSliderCardProps> = ({ value, onChange, isOn, onToggle }) => {
  const thumbScale = useSharedValue(1);

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ scale: thumbScale.value }],
  }));

  const handleToggle = () => {
    thumbScale.value = withSpring(1.2, {}, () => {
      thumbScale.value = withSpring(1);
    });
    onToggle();
  };

  const handleSliderChange = (val: number) => {
    if (!isOn) return;
    thumbScale.value = withSpring(1.2, {}, () => {
      thumbScale.value = withSpring(1);
    });
    onChange(val);
  };

  return (
    <Animated.View
      entering={FadeInUp.duration(500)}
      exiting={FadeOutDown.duration(400)}
      layout={Layout.springify()}
      className={`rounded-2xl px-5 py-4 mb-4 flex-col justify-between shadow-xl ${
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
      {/* Header Row */}
      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-row items-center space-x-2">
          <Feather name="wind" size={24} color="#4F46E5" />
          <Text className="text-indigo-900 font-semibold text-lg tracking-wide">Fan</Text>
        </View>
        <Switch
          value={isOn}
          onValueChange={handleToggle}
          trackColor={{ false: '#CBD5E1', true: '#4F46E5' }}
          thumbColor={Platform.OS === 'android' ? '#fff' : undefined}
        />
      </View>

      {/* Slider with Track */}
      <View className="relative my-3">
        <View
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2"
          style={{
            height: 4,
            backgroundColor: isOn ? '#E0E7FF' : '#CBD5E1',
            borderRadius: 2,
            width: SCREEN_WIDTH - 80,
          }}
        />

        <Animated.View style={thumbStyle}>
          <Slider
            style={{ width: SCREEN_WIDTH - 80, height: 40 }}
            minimumValue={0}
            maximumValue={5}
            step={1}
            value={value}
            disabled={!isOn}
            onValueChange={handleSliderChange}
            minimumTrackTintColor={isOn ? '#6366F1' : '#94A3B8'}
            maximumTrackTintColor="transparent"
            thumbTintColor={isOn ? '#6366F1' : '#CBD5E1'}
          />
        </Animated.View>
      </View>

      {/* Fan Speed Labels */}
      <View className="flex-row justify-between px-1">
        {[0, 1, 2, 3, 4, 5].map((level) => (
          <Animated.View key={`fan-speed-${level}`} layout={Layout.springify()}>
            <Text
              className={`text-sm ${
                level === value ? 'text-indigo-800 font-bold' : 'text-gray-400'
              }`}
              style={level === value ? { transform: [{ scale: 1.1 }] } : {}}
            >
              {level}
            </Text>
          </Animated.View>
        ))}
      </View>
    </Animated.View>
  );
};

export default FanSliderCard;
