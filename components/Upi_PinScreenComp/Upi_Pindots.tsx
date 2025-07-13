import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface PinDotsProps {
  pinLength: number
  maxLength?: number
}
const Upi_Pindots = ({ pinLength, maxLength = 4 }: PinDotsProps) => {
  return (
 <View className="flex-row justify-center items-center px-12 mt-12 mb-8">
      {Array.from({ length: maxLength }, (_, index) => (
        <View key={index} className="flex-1 mx-3">
          <View className={`w-4 h-4 rounded-full ${pinLength > index ? "bg-blue-800" : "bg-gray-300"}`} />
        </View>
      ))}
    </View>
  )
  
}

export default Upi_Pindots
