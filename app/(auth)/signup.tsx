import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';

export default function SignupScreen() {
  const router = useRouter();
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 pt-20 pb-8 mt-15">
          {/* Heading */}
          <Text className="text-gray-500 text-base text-center mb-1">
            Hey there,
          </Text>
          <Text className="text-2xl font-bold text-indigo-900 text-center mb-6">
            Create an Account
          </Text>

          {/* First Name */}
          <View className="flex-row items-center border border-indigo-300 rounded-full px-4 py-3 mb-4">
            <Feather name="user" size={20} color="#4F46E5" />
            <TextInput
              placeholder="First Name"
              className="flex-1 ml-3 text-base text-gray-700"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Last Name */}
          <View className="flex-row items-center border border-indigo-300 rounded-full px-4 py-3 mb-4">
            <Feather name="user" size={20} color="#4F46E5" />
            <TextInput
              placeholder="Last Name"
              className="flex-1 ml-3 text-base text-gray-700"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Email */}
          <View className="flex-row items-center border border-indigo-300 rounded-full px-4 py-3 mb-4">
            <Feather name="mail" size={20} color="#4F46E5" />
            <TextInput
              placeholder="Email"
              className="flex-1 ml-3 text-base text-gray-700"
              keyboardType="email-address"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Password */}
          <View className="flex-row items-center border border-indigo-300 rounded-full px-4 py-3 mb-4">
            <Feather name="lock" size={20} color="#4F46E5" />
            <TextInput
              placeholder="Password"
              className="flex-1 ml-3 text-base text-gray-700"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather
                name={showPassword ? 'eye' : 'eye-off'}
                size={20}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>

          {/* Checkbox + Policy */}
          <View className="flex-row items-start mb-6">
            <TouchableOpacity
              onPress={() => setAgree(!agree)}
              className="w-5 h-5 border border-gray-400 rounded mr-2 mt-1 items-center justify-center"
            >
              {agree && <View className="w-3 h-3 bg-indigo-700 rounded" />}
            </TouchableOpacity>
            <Text className="flex-1 text-xs text-gray-500">
              By continuing you accept our{' '}
              <Text className="text-indigo-700 underline">Privacy Policy</Text> and{' '}
              <Text className="text-indigo-700 underline">Term of Use</Text>
            </Text>
        </View>

          <View className="mt-20">
  {/* Register Button */}
  <TouchableOpacity
    className="bg-indigo-800 py-4 rounded-full mb-4 shadow-lg"
    onPress={() => router.replace('/(tabs)')}
  >
    <Text className="text-white text-center text-lg font-semibold">
      Register
    </Text>
  </TouchableOpacity>

  {/* Divider */}
  <View className="flex-row items-center mb-4">
    <View className="flex-1 h-px bg-gray-300" />
    <Text className="mx-2 text-gray-400">Or</Text>
    <View className="flex-1 h-px bg-gray-300" />
  </View>

  {/* Login Redirect */}
  <Text className="text-center text-sm text-gray-500">
    Already have an account?{' '}
    <Text
      className="text-indigo-700 font-semibold"
      onPress={() => router.replace('/(auth)/login')}
    >
      Login
    </Text>
  </Text>
</View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
