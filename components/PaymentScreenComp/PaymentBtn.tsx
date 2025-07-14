import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Heart } from 'lucide-react-native';

interface ProceedButtonProps {
  onPress: () => void;
  disabled?: boolean;
}
const PaymentBtn: React.FC<ProceedButtonProps> = ({onPress, disabled=false}) => {
  return (
   <View className="px-4 pb-6 bg-white">
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        className={`rounded-lg py-4 flex-row items-center justify-center ${
          disabled ? 'bg-gray-300' : 'bg-blue-500'
        }`}
        activeOpacity={disabled ? 1 : 0.8}
      >
        <Heart 
          size={20} 
          color={disabled ? '#9CA3AF' : 'white'} 
          fill={disabled ? '#9CA3AF' : 'white'} 
          className="mr-2" 
        />
        <Text className={`font-semibold text-lg ml-2 ${
          disabled ? 'text-gray-500' : 'text-white'
        }`}>
          Proceed Securely
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default PaymentBtn                                