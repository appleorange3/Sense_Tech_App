import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        Alert.alert('Login Failed', error.message);
      } else {
        // Success! The AuthContext will automatically redirect to (tabs)
        console.log('Login successful');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    router.replace('/(auth)/signup');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center items-center px-6">
          <Animated.View style={{ opacity: fadeAnim }} className="w-full mt-8">
            {/* Heading */}
            <Text className="text-gray-500 text-base text-center">Hey there,</Text>
            <Text className="text-2xl font-bold text-indigo-900 mb-8 text-center">
              Welcome Back
            </Text>

            {/* Email Input */}
            <View className="flex-row items-center border border-indigo-300 rounded-full px-4 py-3 mb-4">
              <Ionicons name="mail-outline" size={20} color="#4F46E5" />
              <TextInput
                placeholder="Email"
                className="flex-1 ml-3 text-base text-gray-700"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View className="flex-row items-center border border-indigo-300 rounded-full px-4 py-3 mb-2">
              <Feather name="lock" size={20} color="#4F46E5" />
              <TextInput
                placeholder="Password"
                className="flex-1 ml-3 text-base text-gray-700"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={20}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>

            {/* Forgot password */}
            <Text className="text-gray-400 text-sm text-center mb-6">
              Forgot your password?
            </Text>

            {/* Login Button */}
            <TouchableOpacity
              className={`flex-row items-center justify-center py-4 rounded-full w-full mb-6 ${
                loading ? 'bg-indigo-400' : 'bg-indigo-800'
              }`}
              onPress={handleLogin}
              disabled={loading}
            >
              <Feather name="log-in" size={20} color="#fff" className="mr-2" />
              <Text className="text-white text-lg font-semibold">
                {loading ? 'Signing in...' : 'Login'}
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center mb-4 w-full">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="mx-2 text-gray-400">Or</Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            {/* Sign Up */}
            <Text className="text-gray-500 text-sm text-center mb-10">
              Don't have an account yet?{' '}
              <Text
                className="text-indigo-700 font-semibold"
                onPress={handleSignUp}
              >
                Create account
              </Text>
            </Text>
          </Animated.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}