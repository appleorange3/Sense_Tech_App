import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function OnboardingScreen() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/(auth)/login');
  };

  return (
    <View className="flex-1 bg-indigo-900">
      {/* Top Section */}
      <View className="flex-1 justify-center items-center px-4 pt-2 pb-40">
        <View className="w-full h-96 justify-center items-center mb-4">
          <Image 
            source={require('../../assets/images/onboarding.png')}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
      </View>

      {/* Bottom Section */}
      <View className="bg-white rounded-t-3xl px-8 py-12 absolute bottom-0 left-0 right-0">
        {/* Description */}
        <Text className="text-lg text-gray-600 text-center mb-4 leading-6">
          Manage your device effortlessly - just one tap away on your phone
        </Text>

        {/* Button */}
        <View className="w-full py-20">
          <TouchableOpacity
            onPress={handleNext}
            className="bg-indigo-800 py-4 rounded-3xl w-full shadow-lg"
          >
            <Text className="text-white text-center text-lg font-bold tracking-wide">
              LET'S GET STARTED
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}