import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, Text } from "react-native";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { AccountNavigator } from "./account.navigator";
import { AppNavigator } from "./app.navigator";

export const Navigation = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};
