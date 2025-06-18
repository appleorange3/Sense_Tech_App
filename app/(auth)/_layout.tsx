import { Stack } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { Redirect } from 'expo-router';
import { View, Text } from 'react-native';
import '../globals.css'

export default function AuthLayout() {
  const { user, loading } = useAuth();

  // Show loading while checking authentication
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <Text style={{ color: '#fff' }}>Loading...</Text>
      </View>
    );
  }

  // If user is already logged in, redirect to dashboard
  if (user) {
    return <Redirect href="/(tabs)" />;
  }

  // If not logged in, show auth screens
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}