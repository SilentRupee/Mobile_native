import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Building2 } from 'lucide-react-native';


const PaymentRecipient : React.FC = () => {
  return (
    <View className="px-4 py-4 bg-white border-b border-gray-100">
      <Text className="text-gray-600 text-sm mb-2">To</Text>
      <View className="flex-row items-center">
        <View className="w-8 h-8 bg-orange-100 rounded-full items-center justify-center mr-3">
          <Building2 size={16} color="#F97316" />
        </View>
        <Text className="text-black font-medium">UPI Linked Bank A/c</Text>
      </View>
    </View>
  )
}

export default PaymentRecipient
