import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Login} from '@/components/Screens/auth/login'
import { CustomerLogin } from '@/components/Screens/auth/customerlogin'

const login = () => {
  return (
    <View>
    <CustomerLogin/>
    </View>
  )
}

export default login

