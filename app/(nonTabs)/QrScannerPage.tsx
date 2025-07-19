"use client"
import React, { useState, useRef, useEffect } from "react"
import {View,Text,TextInput,TouchableOpacity,ScrollView,StatusBar,SafeAreaView,Animated,Easing, BackHandler,} from "react-native"
import { Camera, CameraView } from "expo-camera"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

type QRScannerScreenProps = {}

export default function QRScannerScreen({}: QRScannerScreenProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [scanned, setScanned] = useState(false)
  const [torchOn, setTorchOn] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [animationError, setAnimationError] = useState(false)

  // Add this to your component state
  const scanAnimation = useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === "granted")
    }

    getCameraPermissions()
  }, [])

//back-navigation
useEffect(()=>{
  const backActionBtn=()=>{
    router.push('/(tabs)/')
    return true
  }
  const backHandler =BackHandler.addEventListener('hardwareBackPress',backActionBtn)
  return () => backHandler.remove()
},[])

  // Add this useEffect for animation
  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanAnimation, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(scanAnimation, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ).start()
    }

    startAnimation()
  }, [])

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true)
    alert(`Bar code with type ${type} and data ${data} has been scanned!`)
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Camera View */}
      <View className="flex-1 relative">
        <CameraView
          className="flex-1"
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          enableTorch={torchOn}
        />

        {/* Header */}
        <View className="absolute top-6 left-0 right-0 flex-row items-center justify-between px-4">
          <View className="flex-1" />
          <Text className="text-white text-lg font-black">Scan Any QR Code</Text>
          <TouchableOpacity className="p-2"
           onPress={() => router.replace('/(tabs)/')} >
            <Ionicons name="close" size={24} color="#B0B0B0" />
          </TouchableOpacity>
        </View>

        {/* Scanner Frame with Animation */}
        <View className="absolute inset-0 items-center justify-center">
          <View className="w-44 h-44 relative">
            {/* Scanner Frame */}
            <View className="w-full h-full border-2 border-white/30 rounded-2xl" />

        
            <View className="absolute inset-0">
              
              <Animated.View
                className="absolute w-full h-1 bg-green-400"
                style={{
                  transform: [
                    {
                      translateY: scanAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 176], 
                      }),
                    },
                  ],
                }}
              />
            </View>
          </View>
        </View>

        
        <View className="absolute right-5 top-32 flex-col gap-5">
          
          <View className="items-center">
            <TouchableOpacity
              className="w-9 h-9 bg-gray-600/70 rounded-full items-center justify-center"
              onPress={() => setTorchOn(!torchOn)}
            >
              <Ionicons name={torchOn ? "flash" : "flash-outline"} size={18} color="white" />
            </TouchableOpacity>
            <View className="mt-1 bg-black/70 rounded px-2 py-1">
              <Text className="text-white text-xs">
                Flash
              </Text>
            </View>
          </View>

          <View className="items-center">
            <TouchableOpacity className="w-9 h-9 bg-gray-600/70 rounded-full items-center justify-center">
              <Ionicons name="images-outline" size={18} color="white" />
            </TouchableOpacity>
            <View className="mt-1 bg-black/70 rounded px-2 py-1">
              <Text className="text-white text-xs">
                Scan from{"\n"}Gallery or{"\n"}WhatsApp
              </Text>
            </View>
          </View>

         
          <View className="items-center">
            <TouchableOpacity className="w-9 h-9 bg-gray-600/70 rounded-full items-center justify-center">
              <Ionicons name="qr-code-outline" size={18} color="white" />
            </TouchableOpacity>
            <View className="mt-1 bg-black/70 rounded px-2 py-1">
              <Text className="text-white text-xs">My QR</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="mx-4 mb-4 bg-green-100 rounded-lg p-4 flex-row items-center justify-between">
        <Text className="text-black text-sm font-medium">Get flat 4500 Cashback Points!</Text>
        <Text className="text-blue-600 text-sm font-medium">Activate now!</Text>
      </View>

      
      <View className="bg-white rounded-t-2xl px-4 pt-4 pb-8">
     
        <View className="border border-gray-300 rounded-lg mb-4 flex-row items-center">
          <TextInput
            className="flex-1 px-4 py-3 text-base text-black"
            placeholder="Enter Mobile Number or Name"
            placeholderTextColor="#B0B0B0"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          <TouchableOpacity className="p-3">
            <Ionicons name="people-outline" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <Text className="text-black text-base font-medium mb-4">Recents</Text>
        <ScrollView className="max-h-32">
          <View className="py-4">
            <Text className="text-gray-500 text-center">No recent scans</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
