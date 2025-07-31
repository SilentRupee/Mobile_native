import { Stack } from 'expo-router';
import '../global.css';
// import AuthProvider from '../src/providers/AuthProvider';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import config from '../gluestack-ui.config.json';

export default function RootLayout() {
  return (
    <GluestackUIProvider config={config}>
      {/* <AuthProvider> */}
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)/login" options={{title:"Merchant Sign Up"}}></Stack.Screen>
          <Stack.Screen name="(auth)/customerlogin" options={{title:"Customer Sign Up"}}></Stack.Screen>
        </Stack>
      {/* </AuthProvider> */}
    </GluestackUIProvider>
  );
} 