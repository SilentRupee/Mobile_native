"use client"

import { View, Text, TouchableOpacity, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import StatusBadge from "./StatusBadge"
import TableActionBtn from "./TableActionBtn"
import { PaymentData } from "@/types/PaymentData"


interface TableRowProps {
  item: PaymentData
  index: number
  isSelected: boolean
  onToggleSelection: () => void
}

const TableRow = ({ item, index, isSelected, onToggleSelection }: TableRowProps) => {
  const generateBill = () => {
    Alert.alert(
      "Generate Bill",
      `Generate bill for ${item.customerName}?\nBill Number: ${item.billNumber}\nAmount: $${item.grossPayments.toFixed(2)}`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Generate", onPress: () => Alert.alert("Success", "Bill generated successfully!") },
      ],
    )
  }

  return (
    <View
      className={`flex-row rounded-lg mb-2 py-4 mx-1 ${
        index % 2 === 0 ? "bg-white" : "bg-gray-50"
      } border border-gray-100 shadow-sm`}
    >
      <View className="w-16 px-3 justify-center mx-1">
        <TouchableOpacity
          className={`w-6 h-6 border-2 rounded-md ${
            isSelected ? "bg-blue-500 border-blue-500" : "border-gray-300 bg-white"
          } items-center justify-center shadow-sm`}
          onPress={onToggleSelection}
        >
          {isSelected && <Ionicons name="checkmark" size={16} color="#fff" />}
        </TouchableOpacity>
      </View>
      <View className="w-40 px-3 justify-center mx-1">
        <Text className="text-sm text-gray-900 font-medium" numberOfLines={2}>
          {item.paymentMethod}
        </Text>
      </View>
      <View className="w-32 px-3 justify-center mx-1">
        <Text className="text-sm text-gray-700" numberOfLines={1}>
          {item.creditCard}
        </Text>
      </View>
      <View className="w-32 px-3 justify-center mx-1">
        <Text className="text-sm text-gray-700" numberOfLines={1}>
          {item.salesChannel}
        </Text>
      </View>
      <View className="w-28 px-3 justify-center mx-1">
        <Text className="text-sm text-gray-900 font-semibold text-center">{item.transactions}</Text>
      </View>
      <View className="w-36 px-3 justify-center mx-1">
        <Text className="text-sm text-gray-900 font-semibold text-right">
          ${item.grossPayments.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </Text>
      </View>
      <View className="w-28 px-3 justify-center mx-1">
        <Text className="text-sm text-gray-700 text-right">${item.taxAmount.toFixed(2)}</Text>
      </View>
      <View className="w-32 px-3 justify-center mx-1">
        <Text className="text-sm text-gray-900 font-semibold text-right">
          ${item.netAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </Text>
      </View>
      <View className="w-28 px-3 justify-center mx-1">
        <Text className="text-sm text-gray-700 text-right">${item.commission.toFixed(2)}</Text>
      </View>
      <View className="w-24 px-3 justify-center mx-1">
        <StatusBadge status={item.status} />
      </View>
      <View className="w-28 px-3 justify-center mx-1">
        <Text className="text-sm text-gray-700 text-center">{item.date}</Text>
      </View>
      <View className="w-36 px-3 justify-center mx-1">
        <Text className="text-sm text-gray-900 font-medium" numberOfLines={1}>
          {item.customerName}
        </Text>
      </View>
      <View className="w-28 px-3 justify-center mx-1">
        <Text className="text-sm text-gray-700 font-mono text-center">{item.billNumber}</Text>
      </View>
      <View className="w-24 px-3 justify-center mx-1">
        <TableActionBtn onPress={generateBill} />
      </View>
    </View>
  )
}

export default TableRow
