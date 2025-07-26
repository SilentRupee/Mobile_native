import { router, Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';


export default function TabLayout() {
  useEffect(() => {
    const [isChecking, setIsChecking] = useState(true);
    const checkAuthStatus = async () => {
      try {
        // 1. Check for the token in AsyncStorage
        const token = await AsyncStorage.getItem('token');

        // 2. If no token is found, redirect to the login screen
        if (!token) {
          // Use .replace() so the user can't go "back" to the protected screen
          router.replace('/(auth)/login'); 
        }
      } catch (error) {
        // Handle potential errors (e.g., storage is unavailable)
        console.error("Failed to check auth status:", error);
        router.replace('/(auth)/login');
      } finally {
        // 3. Stop the loading indicator once the check is complete
        setIsChecking(false);
      }
    };
    if (isChecking) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      );
    }

    checkAuthStatus();
  }, []);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
       
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="Service"
        options={{
          title: 'Services',
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="customerservice" size={24} color="black" />
          ),
        }}
      />

      <Tabs.Screen
        name="Scanner"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="qr-code-scanner" size={30} color="black" />
          ),
        }}
      />


        <Tabs.Screen
        name="Setting"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="settings-suggest" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
});