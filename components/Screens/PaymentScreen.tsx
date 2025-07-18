import { StyleSheet, Text, View , SafeAreaView, StatusBar, Alert } from 'react-native'
import React,{useState} from 'react'
import Payment_Header from '../PaymentScreenComp/Payment_Header'
import PaymentRecipient from '../PaymentScreenComp/PaymentRecipient'
import PaymentAmount from '../PaymentScreenComp/PaymentAmount'
import PaymentBtn from '../PaymentScreenComp/PaymentBtn'
import PaymentFooter from '../PaymentScreenComp/PaymentFooter'

const PaymentScreen : React.FC = () => {

    const [amount, setAmount] = useState('');
  const [isEditingAmount, setIsEditingAmount] = useState(false);
  const handleBackPress = () => {
    // Handle back navigation
    console.log('Back pressed');
  };

  const handleAmountPress = () => {
    setIsEditingAmount(true);
  };

  const handleAmountChange = (newAmount: string) => {
    const cleanAmount = newAmount.replace(/[^0-9.]/g, '');
    
   
    const parts = cleanAmount.split('.');
    if (parts.length > 2) {
      return;
    }
    
    if (parts[1] && parts[1].length > 2) {
      return;
    }
    
    setAmount(cleanAmount);
  };

  const handleAmountSubmit = () => {
    setIsEditingAmount(false);
    
    const numericAmount = parseFloat(amount);
    if (amount && (isNaN(numericAmount) || numericAmount <= 0)) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount greater than 0');
      setAmount('');
      return;
    }
    
    if (amount && amount.includes('.')) {
      const formatted = parseFloat(amount).toFixed(2);
      setAmount(formatted);
    }
  };

  const handleProceed = () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Enter Amount', 'Please enter an amount to proceed');
      return;
    }
    
    Alert.alert(
      'Confirm Payment',
      `Are you sure you want to pay ₹${amount}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', onPress: () => console.log(`Processing payment of ₹${amount}`) }
      ]
    );
  };

  const isAmountValid = amount && parseFloat(amount) > 0;

  return (
   <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      <View className="flex-1">
        <Payment_Header onBackPress={handleBackPress} />
        <PaymentRecipient />
        <PaymentAmount amount={amount}
          isEditing={isEditingAmount}
          onAmountPress={handleAmountPress}
          onAmountChange={handleAmountChange}
          onAmountSubmit={handleAmountSubmit} />
        <PaymentBtn onPress={handleProceed}
          disabled={!isAmountValid} />
        <PaymentFooter />
      </View>
    </SafeAreaView>
  )
}

export default PaymentScreen
