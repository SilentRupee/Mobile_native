"use client"
import { View, SafeAreaView, StatusBar } from "react-native"
import Upi_PinHeader from "../Upi_PinScreenComp/Upi_PinHeader"
import Upi_transactionDetails from "../Upi_PinScreenComp/Upi_transactionDetails"
import Upi_pinEntryTitle from "../Upi_PinScreenComp/Upi_pinEntryTitle"
import Upi_Pindots from "../Upi_PinScreenComp/Upi_Pindots"
import Upi_pinWarningCard from "../Upi_PinScreenComp/Upi_pinWarningCard"
import Upi_PinNumberPad from "../Upi_PinScreenComp/Upi_PinNumberPad"
import { usePinEntry } from "@/hooks/usePinEntry"

interface UpiPinScreenProps {
  bankName?: string
  accountNumber?: string
  recipientName?: string
  amount?: string
  upiLogoUrl?: string
  onPinSubmit?: (pin: string) => void
  maxPinLength?: number
}

export default function UpiPinScreen({
  bankName = "State Bank of India",
  accountNumber = "XXXX4652",
  recipientName = "PaytmUser",
  amount = "₹ 100.00",
  upiLogoUrl = "",
  onPinSubmit,
  maxPinLength = 4,
}: UpiPinScreenProps) {
  const { pin, pinLength, addDigit, removeDigit, isComplete, } = usePinEntry({
    maxLength: maxPinLength,
    onPinComplete: (completedPin) => {
      console.log("PIN completed:", completedPin)
    },
  })

  const handleDone = () => {
    if (isComplete) {
      onPinSubmit?.(pin)
      console.log("PIN submitted:", pin)
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <Upi_PinHeader bankName={bankName} accountNumber={accountNumber} upiLogoUrl={upiLogoUrl} />

      <Upi_transactionDetails recipientName={recipientName} amount={amount} />

      <Upi_pinEntryTitle pinLength={maxPinLength} />

      <Upi_Pindots pinLength={pinLength} maxLength={maxPinLength} />

      <Upi_pinWarningCard message="" recipientName={recipientName} />

      {/* Spacer */}
      <View className="flex-1" />

      <Upi_PinNumberPad
        onNumberPress={addDigit}
        onBackspace={removeDigit}
        onDone={handleDone}
        maxPinLength={maxPinLength}
        currentPinLength={pinLength}
      />
    </SafeAreaView>
  )
}
