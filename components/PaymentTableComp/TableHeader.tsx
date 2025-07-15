"use client"

import { View, Text } from "react-native"

const TableHeader = () => {
  return (
    <View className="flex-row bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg mb-2 py-4 mx-1">
      <View className="w-16 px-3 justify-center mx-1">
        <Text className="text-xs font-bold text-gray-700 uppercase tracking-wide">Select</Text>
      </View>
      <View className="w-40 px-3 justify-center mx-1">
        <Text className="text-xs font-bold text-gray-700 uppercase tracking-wide">Payment Method</Text>
      </View>
      <View className="w-32 px-3 justify-center mx-1">
        <Text className="text-xs font-bold text-gray-700 uppercase tracking-wide">Credit Card</Text>
      </View>
      <View className="w-32 px-3 justify-center mx-1">
        <Text className="text-xs font-bold text-gray-700 uppercase tracking-wide">Sales Channel</Text>
      </View>
      <View className="w-28 px-3 justify-center mx-1">
        <Text className="text-xs font-bold text-gray-700 uppercase tracking-wide">Transactions</Text>
      </View>
      <View className="w-36 px-3 justify-center mx-1">
        <Text className="text-xs font-bold text-gray-700 uppercase tracking-wide">Gross Payments</Text>
      </View>
      <View className="w-28 px-3 justify-center mx-1">
        <Text className="text-xs font-bold text-gray-700 uppercase tracking-wide">Tax Amount</Text>
      </View>
      <View className="w-32 px-3 justify-center mx-1">
        <Text className="text-xs font-bold text-gray-700 uppercase tracking-wide">Net Amount</Text>
      </View>
      <View className="w-28 px-3 justify-center mx-1">
        <Text className="text-xs font-bold text-gray-700 uppercase tracking-wide">Commission</Text>
      </View>
      <View className="w-24 px-3 justify-center mx-1">
        <Text className="text-xs font-bold text-gray-700 uppercase tracking-wide">Status</Text>
      </View>
      <View className="w-28 px-3 justify-center mx-1">
        <Text className="text-xs font-bold text-gray-700 uppercase tracking-wide">Date</Text>
      </View>
      <View className="w-36 px-3 justify-center mx-1">
        <Text className="text-xs font-bold text-gray-700 uppercase tracking-wide">Customer</Text>
      </View>
      <View className="w-28 px-3 justify-center mx-1">
        <Text className="text-xs font-bold text-gray-700 uppercase tracking-wide">Bill Number</Text>
      </View>
      <View className="w-24 px-3 justify-center mx-1">
        <Text className="text-xs font-bold text-gray-700 uppercase tracking-wide">Actions</Text>
      </View>
    </View>
  )
}

export default TableHeader
