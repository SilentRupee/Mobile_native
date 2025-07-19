import { StyleSheet, Text, View } from 'react-native'
import {Link, router, useFocusEffect} from 'expo-router'
import React from 'react'

const Scanner = () => {
useFocusEffect(
  React.useCallback(()=>{
    router.replace('/QrScannerPage')
  },[])
)
return null
}

export default Scanner
