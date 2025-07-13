import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface TransactionDetailsProps {
  recipientName: string
  amount: string
}
const Upi_transactionDetails = ({recipientName,amount}:TransactionDetailsProps) => {
  return (
    <View className="bg-gray-50 mx-0 py-4 px-6 mt-4">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-base text-gray-600">To:</Text>
        <Text className="text-base font-medium text-black">{recipientName}</Text>
      </View>
      <View className="flex-row justify-between items-center">
        <Text className="text-base text-gray-600">Sending:</Text>
        <Text className="text-base font-medium text-black">{amount}</Text>
      </View>
    </View>
  )
}

export default Upi_transactionDetails
