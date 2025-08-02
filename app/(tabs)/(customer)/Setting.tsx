import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

const SettingScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl font-semibold text-gray-800">Settings</Text>
        <Text className="text-gray-600 mt-2">Coming soon...</Text>
      </View>
    </SafeAreaView>
  );
};

export default SettingScreen; 