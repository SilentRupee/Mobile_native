import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

interface NumberButtonProps {
  number: string
  onPress: () => void
  disabled?: boolean
}
const Upi_PinNumberBtn = ({number,onPress,disabled=false}:NumberButtonProps) => {
  return (
    <TouchableOpacity
      className={`flex-1 h-16 justify-center items-center ${disabled ? "opacity-50" : "active:bg-gray-200"}`}
      onPress={onPress}
      disabled={disabled}
    >
      <Text className="text-3xl font-normal text-blue-800">{number}</Text>
    </TouchableOpacity>
  )
  
}

export default Upi_PinNumberBtn

