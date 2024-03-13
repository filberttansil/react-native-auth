import { View, Text, Button } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Product from "../screens/Product";
import { useAuth } from "../context/AuthContext";
import { AuthStackGroup } from "./AuthStack";
const Stack = createNativeStackNavigator();
function RootStackGroup() {
  const { onLogout } = useAuth();
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => <Button onPress={onLogout} title="Sign Out" />,
      }}
    >
      <Stack.Screen name="Products" component={Product} />
    </Stack.Navigator>
  );
}
export default function Navigator() {
  const { authState, onLogout } = useAuth();
  useEffect(() => {
    console.log(authState);
  }, []);
  return (
    <NavigationContainer>
      {authState?.authenticated ? <RootStackGroup /> : <AuthStackGroup />}
    </NavigationContainer>
  );
}
