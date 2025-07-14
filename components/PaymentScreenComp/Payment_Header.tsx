import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { ArrowLeft, CheckCircle } from 'lucide-react-native';

interface HeaderProps {
  onBackPress: () => void;
}

const Payment_Header: React.FC<HeaderProps>= ({ onBackPress }) => {
  return (
    <View className="flex-row items-center px-4 py-3 bg-white">
      <TouchableOpacity onPress={onBackPress} className="mr-4">
        <ArrowLeft size={24} color="#000" />
      </TouchableOpacity>
      
      <View className="flex-row items-center flex-1">
        <View className="w-12 h-12 bg-purple-500 rounded-full items-center justify-center mr-3">
          <Text className="text-white font-bold text-lg">PU</Text>
        </View>
        
        <View className="flex-1">
          <View className="flex-row items-center">
            <Text className="text-black font-semibold text-lg mr-1">
              Paytm User
            </Text>
            <CheckCircle size={16} color="#1DA1F2" />
          </View>
          <Text className="text-gray-600 text-sm">
            paytmuser@upi
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Payment_Header

