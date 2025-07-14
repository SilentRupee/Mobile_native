import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PaymentFooter: React.FC = () => {
  return (
    <View className="items-center pb-4 bg-white">
      <Text className="text-gray-500 text-xs">
        Powered by{' '}
        <Text className="font-semibold text-purple-600">UPI</Text>
      </Text>
    </View>
  )
}

export default PaymentFooter