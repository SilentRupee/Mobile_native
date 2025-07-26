import { Stack } from 'expo-router';
import '../global.css';
import AuthProvider from '../src/providers/AuthProvider';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)/login" options={{title:"Sign Up"}}></Stack.Screen>
      </Stack>
    </AuthProvider>
  );
} 