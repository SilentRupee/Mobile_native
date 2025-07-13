import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

interface ErrorMessageProps {
  message: string
  isVisible: boolean
  onDismiss: () => void
}


const Upi_PinErrorMessage =({ message, isVisible, onDismiss }: ErrorMessageProps) => {
     if (!isVisible) return null
     
  return (
 <View className="bg-gray-100 mx-0 h-12 flex-row justify-between items-center px-4">
      <Text className="text-base text-red-500">{message}</Text>
      <TouchableOpacity onPress={onDismiss}>
        <Text className="text-base text-[#0D017B] font-medium">DISMISS</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Upi_PinErrorMessage

