import { Stack } from 'expo-router';
import '../globals.css'

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
    </Stack>
  );
}