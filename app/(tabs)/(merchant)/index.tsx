import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from '../../../components/Screens/HomeScreen';

const Index: React.FC = () => {
  console.log("Dasdas");
    return (
    <SafeAreaProvider>  
      <HomeScreen/>
    </SafeAreaProvider>
  );
};

export default Index;