// import { PrivyProvider } from '@privy-io/expo';
// import { SmartWalletsProvider } from '@privy-io/expo/smart-wallets';
// import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
// import { useFonts } from 'expo-font';
// import { ReactNode } from 'react';

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export default function AuthProvider({ children }: AuthProviderProps) {
//   const [fontsLoaded] = useFonts({
//     Inter_400Regular,
//     Inter_500Medium,
//     Inter_600SemiBold,
//   });

//   if (!fontsLoaded) {
//     return null;
//   }

//   return (
//     <PrivyProvider
//       appId="cmbgq970a00bnjx0ljjstea1r"
//       clientId="client-WY6MAHqPQ5xinYbdJprLg3JgCGWi44fvro3fqwVp3VbRV"
//     >
//       <SmartWalletsProvider>{children}</SmartWalletsProvider>
//     </PrivyProvider>
//   );
// } 