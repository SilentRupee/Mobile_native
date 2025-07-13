import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UpiPinScreen from '@/components/Screens/UpiPinEnterScreen'

const Upi_PinScreen = () => {
    const handlePinSubmit = (pin: string) => {
    console.log("Processing PIN:", pin)
    // Add your PIN processing logic here
    }
  return (
    <View className="flex-1">
      <UpiPinScreen
        bankName="State Bank of India"
        accountNumber="XXXX4652"
        recipientName="PaytmUser"
        amount="₹ 100.00"
        onPinSubmit={handlePinSubmit}
        maxPinLength={4}
      />
    </View>
  )

}

export default Upi_PinScreen
