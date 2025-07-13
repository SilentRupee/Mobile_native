import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

interface Headerprops{
    bankName:string
    accountNumber:string
    upiLogoUrl:string
}
const Upi_PinHeader = ({bankName, accountNumber, upiLogoUrl} : Headerprops)  => {
  return (
     <View className="flex-row justify-between items-start px-6 pt-4 pb-2">
      <View className="flex-1">
        <Text className="text-base text-gray-700 mb-1">{bankName}</Text>
        <Text className="text-base font-medium text-black">{accountNumber}</Text>
      </View>
      <View className="ml-4">
        <Image
          source={{ uri: upiLogoUrl || "/placeholder.svg?height=40&width=80" }}
          className="w-20 h-10"
          resizeMode="contain"
        />
      </View>
    </View>
  )
}

export default Upi_PinHeader

