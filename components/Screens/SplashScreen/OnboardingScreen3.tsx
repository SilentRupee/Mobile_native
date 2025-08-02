import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { router } from 'expo-router';

const OnboardingScreen3 = () => {
  const handleMerchantPress = () => {
    console.log('Get Started as Merchant pressed');
    // Navigate to merchant auth flow
    router.push('/(auth)/login');
  };

  const handleCustomerPress = () => {
    console.log('Get Started as Customer pressed');
    
    router.push('/(auth)/customerlogin');
  };

  return (
   <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

     
    <View className="flex-1 justify-center items-center px-8 pt-16">
        <View className="items-center w-full max-w-sm">
          
          <View className="w-20 h-20 bg-black rounded-full mb-6 justify-center items-center shadow-lg">
            <Text className="text-white text-3xl font-bold">A</Text>
          </View>
          <TouchableOpacity
            onPress={handleMerchantPress}
            className="bg-black rounded-xl py-4 px-8 mb-4 w-full h-14 justify-center items-center shadow-lg"
            activeOpacity={0.8}
          >
            <Text className="text-white text-base font-semibold text-center tracking-wide">
              Get Started as Merchant
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleCustomerPress}
            className="bg-white border-2 border-black rounded-xl py-4 px-8 mb-6 w-full h-14 justify-center items-center shadow-md"
            activeOpacity={0.8}
          >
            <Text className="text-black text-base font-semibold text-center tracking-wide">
              Get Started as Customer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen3;