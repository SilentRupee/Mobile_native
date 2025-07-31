import { Tabs } from 'expo-router';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';

export default function TabLayout() {
  
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
        name="bill-payment"
        options={{
          title: 'Create Bill',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="receipt" size={24} color={color} />
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
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color, focused }) => (
            <Feather name="credit-card" size={24} color={color} />
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
