import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'

interface ActionButtonProps {
  children: React.ReactNode
  onPress: () => void
  disabled?: boolean
  variant?: "cancel" | "done"
}

const UpiPin_ActionBtn = ({children, onPress, disabled = false, variant}: ActionButtonProps) => {
     const getBackgroundColor = () => {
    if (disabled) return "opacity-50"
    if (variant === "cancel") return "active:bg-red-100"
    if (variant === "done") return "active:bg-green-100"
    return "active:bg-gray-200"
  }
  return (
 <TouchableOpacity
      className={`flex-1 h-16 justify-center items-center ${getBackgroundColor()}`}
      onPress={onPress}
      disabled={disabled}
    >
      {variant === "cancel" || variant === "done" ? (
        <View
          className={`w-10 h-10 rounded-full items-center justify-center ${
            variant === "cancel" ? "bg-blue-800" : "bg-blue-800"
          }`}
        >
          {children}
        </View>
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}

export default UpiPin_ActionBtn
