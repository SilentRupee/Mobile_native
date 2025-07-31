// app/index.tsx  (Ensure the file extension is .tsx)

import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import {jwtDecode} from "jwt-decode"

const StartPage = () => {
  // Use a more descriptive state name
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
        console.log("cj");
      try {
        const token = await AsyncStorage.getItem("token");
        let role="Customer";
        if (token) {
          const decoded = jwtDecode(token);

          console.log(decoded); 
        }
         console.log("true");
        setIsAuthenticated(!!token); 
      } catch (error) {
        console.error("Failed to check auth status", error);

        setIsAuthenticated(false);
      }
    };
    
    checkAuthStatus();
  }, []);
  if (isAuthenticated === null) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }
  if (isAuthenticated) {
    return <Redirect href="/(tabs)/(admin)" />;
  } else {
    return <Redirect href="/(auth)/login" />;
  }
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartPage;

