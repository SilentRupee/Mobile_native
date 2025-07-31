// app/index.tsx  (Ensure the file extension is .tsx)

import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { jwtDecode } from "jwt-decode";

const StartPage = () => {
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        console.log("dasdas");
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const decoded: any = jwtDecode(token);
          if (decoded.role === "Merchant") {
            setRedirectPath("/(tabs)/(merchant)");
          } else if (decoded.role === "Customer") {
            setRedirectPath("/(tabs)/(customer)");
          } else {
            setRedirectPath("/(auth)/login");
          }
        } else {
          setRedirectPath("/(auth)/login");
        }
      } catch (error) {
        setRedirectPath("/(auth)/login");
      }
    };
    checkAuthStatus();
  }, []);

  if (!redirectPath) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return <Redirect href={redirectPath} />;
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartPage;

