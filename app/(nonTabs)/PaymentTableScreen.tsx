import { StyleSheet, Text, View ,SafeAreaView} from 'react-native'
import React from 'react'
import PaymentDashboard from '@/components/Screens/PaymentTableDashboard'

const PaymentTableScreen = () => {
  return (
     <SafeAreaView className="flex-1 bg-slate-50">
      <PaymentDashboard />
    </SafeAreaView>
  )
}

export default PaymentTableScreen
