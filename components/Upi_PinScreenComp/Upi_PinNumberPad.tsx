import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons"
import NumberButton  from "./Upi_PinNumberBtn"
import ActionButton from "./UpiPin_ActionBtn"

interface NumberPadProps {
  onNumberPress: (number: string) => void
  onBackspace: () => void
  onDone: () => void
  maxPinLength: number
  currentPinLength: number
}
const Upi_PinNumberPad = ({ onNumberPress, onBackspace, onDone, maxPinLength, currentPinLength }:NumberPadProps) => {
   const isMaxLength = currentPinLength >= maxPinLength
  return (
        <View className="bg-gray-100 pt-4">
      {/* Row 1: 1, 2, 3 */}
      <View className="flex-row">
        <NumberButton number="1" onPress={() => onNumberPress("1")} disabled={isMaxLength} />
        <NumberButton number="2" onPress={() => onNumberPress("2")} disabled={isMaxLength} />
        <NumberButton number="3" onPress={() => onNumberPress("3")} disabled={isMaxLength} />
      </View>

      {/* Row 2: 4, 5, 6 */}
      <View className="flex-row">
        <NumberButton number="4" onPress={() => onNumberPress("4")} disabled={isMaxLength} />
        <NumberButton number="5" onPress={() => onNumberPress("5")} disabled={isMaxLength} />
        <NumberButton number="6" onPress={() => onNumberPress("6")} disabled={isMaxLength} />
      </View>

      {/* Row 3: 7, 8, 9 */}
      <View className="flex-row">
        <NumberButton number="7" onPress={() => onNumberPress("7")} disabled={isMaxLength} />
        <NumberButton number="8" onPress={() => onNumberPress("8")} disabled={isMaxLength} />
        <NumberButton number="9" onPress={() => onNumberPress("9")} disabled={isMaxLength} />
      </View>

      {/* Row 4: X, 0, ✓ */}
      <View className="flex-row pb-8">
        <ActionButton onPress={onBackspace} disabled={currentPinLength === 0} variant="cancel">
          <Text className="text-white text-xl font-bold">✕</Text>
        </ActionButton>
        <NumberButton number="0" onPress={() => onNumberPress("0")} disabled={isMaxLength} />
        <ActionButton onPress={onDone} variant="done">
          <Text className="text-white text-xl font-bold">✓</Text>
        </ActionButton>
      </View>
    </View>
  )
}
export default Upi_PinNumberPad
