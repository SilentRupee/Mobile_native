import { StyleSheet, Text, View } from 'react-native'
import {Link} from 'expo-router'
import React from 'react'

const Scanner = () => {
  return (
    <View>
      <Text>Scanner</Text>
      <Link href={"/QrScannerPage"}>
      <Text>hi there</Text></Link>
    </View>
  )
}

export default Scanner

const styles = StyleSheet.create({})