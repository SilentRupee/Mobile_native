// app/index.tsx  (Ensure the file extension is .tsx)

import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View, StyleSheet } from "react-native";

const StartPage = () => {
  // Use a more descriptive state name
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
        console.log("cj");
      try {
        const token = await AsyncStorage.getItem("token");
        // Corrected Logic:
        // !!token is `true` if the token exists.
        // !!token is `false` if the token is null.
        setIsAuthenticated(!!token); 
      } catch (error) {
        console.error("Failed to check auth status", error);
        // Default to not authenticated if an error occurs
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Show a loading indicator while we check for the token.
  // This prevents any screen flicker.
  if (isAuthenticated === null) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  // Corrected Redirection:
  // If the user is authenticated, send them to the main app.
  // Otherwise, send them to the login screen.
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
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