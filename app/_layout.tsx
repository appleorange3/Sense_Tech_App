import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { View, ActivityIndicator, Text } from 'react-native';
import "./globals.css"

// Auth Guard Component
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return; // Don't redirect while loading

    const inAuthGroup = segments[0] === '(auth)';

    if (user && inAuthGroup) {
      // User is logged in but seeing auth screens, redirect to main app
      router.replace('/(tabs)');
    } else if (!user && !inAuthGroup) {
      // User is not logged in but not in auth group, redirect to auth
      router.replace('/(auth)');
    }
  }, [user, loading, segments]);

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-indigo-900">
        <ActivityIndicator size="large" color="white" />
        <Text className="text-white mt-4 text-lg">Loading...</Text>
      </View>
    );
  }

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGuard>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="appliances/[applianceid]" />
          <Stack.Screen name="room/[roomid]" />
        </Stack>
      </AuthGuard>
    </AuthProvider>
  );
}