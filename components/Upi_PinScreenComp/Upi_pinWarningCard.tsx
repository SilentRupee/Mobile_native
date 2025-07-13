import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from "@expo/vector-icons"
import React from 'react'

interface WarningCardProps {
  message: string
  recipientName: string
}
const Upi_pinWarningCard = ({ message, recipientName }: WarningCardProps) => {
  return (
<View className="mx-6 mb-8 bg-orange-50 rounded-lg p-4 flex-row items-center border border-orange-200">
      <View className="w-6 h-6 bg-orange-400 rounded-full items-center justify-center mr-3">
        <Text className="text-white text-xs font-bold">!</Text>
      </View>
      <Text className="flex-1 text-sm text-gray-700 leading-5">
        You are transferring money from your account to {recipientName}
      </Text>
    </View>
  )
}

export default Upi_pinWarningCard
