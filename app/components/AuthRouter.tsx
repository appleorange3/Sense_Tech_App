import { useAuth } from '../context/AuthContext'
import { Redirect } from 'expo-router'
import { View, Text } from 'react-native'

export default function AuthRouter() {
  const { user, loading } = useAuth()

  // Show loading screen while checking auth
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    )
  }

  // If user is logged in, redirect to tabs (dashboard)
  if (user) {
    return <Redirect href="/(tabs)" />
  }

  // If not logged in, redirect to auth
  return <Redirect href="/(auth)" />
}