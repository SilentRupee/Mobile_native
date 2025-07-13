import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
interface PinEntryTitleProps {
  title?: string
  pinLength?: number
}
const Upi_pinEntryTitle = ({ title, pinLength = 4 }: PinEntryTitleProps) => {
   const defaultTitle = `ENTER ${pinLength}-DIGIT UPI PIN`

  return    (
   <Text className="text-sm font-medium text-gray-800 text-center mt-8 tracking-wide">{title || defaultTitle}</Text>
  )
}

export default Upi_pinEntryTitle
