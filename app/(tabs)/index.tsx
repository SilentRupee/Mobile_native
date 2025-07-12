import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from '../../components/Screens/HomeScreen';

const index : React.FC = () => {
    return (
    <SafeAreaProvider>
      <HomeScreen/>
    </SafeAreaProvider>
  );
};

export default index