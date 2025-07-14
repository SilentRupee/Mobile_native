import { StyleSheet, Text, View,  TouchableOpacity, TextInput } from 'react-native'
import React from 'react'


interface AmountDisplayProps {
  amount: string;
  isEditing: boolean;
  onAmountPress: () => void;
  onAmountChange: (amount: string) => void;
  onAmountSubmit: () => void;
}

const PaymentAmount : React.FC<AmountDisplayProps> = ({amount, isEditing, onAmountPress, onAmountChange, 
  onAmountSubmit })=>{
  return (
   <View className="flex-1 items-center justify-center bg-white px-4">
      {isEditing ? (
        <View className="items-center">
          <View className="flex-row items-center">
            <Text className="text-gray-400 text-8xl font-light">₹</Text>
            <TextInput
              value={amount}
              onChangeText={onAmountChange}
              onSubmitEditing={onAmountSubmit}
              onBlur={onAmountSubmit}
              keyboardType="numeric"
              autoFocus
              className="text-gray-400 text-8xl font-light min-w-[200px] text-center"
              placeholder="0"
              placeholderTextColor="#9CA3AF"
              returnKeyType="done"
            />
          </View>
          <Text className="text-gray-500 text-sm mt-4">
            Tap done or press enter to confirm
          </Text>
        </View>
      ) : (
        <TouchableOpacity onPress={onAmountPress} activeOpacity={0.7}>
          <Text className="text-gray-400 text-8xl font-light">
            ₹{amount || '0'}
          </Text>
          <Text className="text-gray-500 text-sm text-center mt-2">
            Tap to enter amount
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default PaymentAmount
