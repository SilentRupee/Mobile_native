"use client"

import { useState, useCallback } from "react"

interface UsePinEntryProps {
  maxLength?: number
  onPinComplete?: (pin: string) => void
  onPinChange?: (pin: string) => void
}

export function usePinEntry({ maxLength = 4, onPinComplete, onPinChange }: UsePinEntryProps = {}) {
  const [pin, setPin] = useState("")

  const addDigit = useCallback(
    (digit: string) => {
      if (pin.length < maxLength) {
        const newPin = pin + digit
        setPin(newPin)
        onPinChange?.(newPin)

        if (newPin.length === maxLength) {
          onPinComplete?.(newPin)
        }
      }
    },
    [pin, maxLength, onPinComplete, onPinChange],
  )

  const removeDigit = useCallback(() => {
    const newPin = pin.slice(0, -1)
    setPin(newPin)
    onPinChange?.(newPin)
  }, [pin, onPinChange])

  const clearPin = useCallback(() => {
    setPin("")
    onPinChange?.("")
  }, [onPinChange])

  return {
    pin,
    pinLength: pin.length,
    addDigit,
    removeDigit,
    clearPin,
    isComplete: pin.length === maxLength,
  }
}
