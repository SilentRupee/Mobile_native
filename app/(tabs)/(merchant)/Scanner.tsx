import { Alert, StyleSheet, Text, View } from 'react-native'
import {Link, router, useFocusEffect} from 'expo-router'
import { Camera } from 'expo-camera'
import React from 'react'

const Scanner = () => {
const requestCameraPermission = async ()=>{
  try{
    const { status } = await Camera.requestCameraPermissionsAsync()
    if(status === 'granted'){
      console.log('camera permission granted')
      router.replace('/QrScannerPage')
    }else{
      console.log('camera permission denied')
      Alert.alert(
          'camera permission required',
         'This app needs camera access to scan QR codes. Please grant camera permission in your device settings.',
         [
          {
            text:'Cancel', style:'cancel'
          },
          {
            text:'open Settings', onPress:() =>{
              // setting app logic here permisson one
            }
          }
         ]
      )
      router.replace('/(tabs)/')
    }
  } catch(error) {
    console.log('Permission request error:',error)
    Alert.alert('Error','Failed to request camera permission')
    router.replace('/(tabs)/')
  }
}
useFocusEffect(
  React.useCallback(() =>{
    requestCameraPermission()
  },[])
)
return null
}

export default Scanner
