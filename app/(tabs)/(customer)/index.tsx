import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from '../../../components/Screens/HomeScreen';
import { View, Text } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const Index = () => {
  console.log("Dasdas");
  console.log("customer");
 const logout=async()=>{
  await AsyncStorage.removeItem("token");
  router.push("/(auth)/login")
 }
    return (
    <SafeAreaProvider>  
      
      <View>
        <Button onPress={logout}>
          <ButtonText>Logout</ButtonText>
        </Button>
        </View>
        
    </SafeAreaProvider>
  );
};

export default Index;