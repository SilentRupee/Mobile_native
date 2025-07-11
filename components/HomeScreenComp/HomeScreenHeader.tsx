import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const HomeScreenHeader: React.FC = () => {
   return (
    <View className="flex-row justify-between items-center px-5 py-4 bg-white">
      <View className="flex-row items-center">
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' }}
          className="w-12 h-12 rounded-full mr-3"
        />
        <View className="flex-col">
          <Text className="text-sm text-gray-600 font-normal">
            Welcome Back,
          </Text>
          <Text className="text-lg text-black font-semibold">
            Sai
          </Text>
        </View>
      </View>
      <TouchableOpacity className="p-2">
        <Ionicons name="menu" size={24} color="#000000" />
      </TouchableOpacity>
    </View>
  );
};
export default HomeScreenHeader;
