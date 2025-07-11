import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreenCreditCard: React.FC = () => {
  return (
    <View className="px-5 mb-5">
      <View className="bg-black rounded-2xl p-5 min-h-[200px]">
        <View className="flex-row justify-between items-start mb-8">
          <View className="mt-2">
            <View className="w-10 h-8 bg-white rounded-md opacity-90" />
          </View>
          <Text className="text-2xl font-bold text-white">₹ 25,000.00</Text>
        </View>
        
        <View className="flex-1 justify-between">
          <View className="mb-5">
            <Text className="text-xs text-gray-300 font-medium mb-1 tracking-wider">CARD NUMBER</Text>
            <Text className="text-base text-white font-medium tracking-widest">3829 4820 4629 5025</Text>
          </View>
          
          <View className="flex-row justify-between items-end">
            <View className="flex-1">
              <Text className="text-xs text-gray-300 font-medium mb-1 tracking-wider">CARD HOLDER NAME</Text>
              <Text className="text-sm text-white font-medium">SAI SATVIK</Text>
            </View>
            <View className="mr-5">
              <Text className="text-xs text-gray-300 font-medium mb-1 tracking-wider">VALID</Text>
              <Text className="text-sm text-white font-medium">05/24</Text>
            </View>
            <Ionicons name="eye-off" size={20} color="#FFFFFF" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreenCreditCard;