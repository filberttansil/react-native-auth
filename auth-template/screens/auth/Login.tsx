import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin } = useAuth();
  const login = async () => {
    const result = await onLogin!(email, password);
    if (result && result.error) {
      alert(result.msg);
    }
  };
  return (
    <View>
      <Text>Email:</Text>
      <TextInput
        style={{ borderWidth: 1, borderRadius: 5, padding: 5 }}
        placeholder="Email..."
        autoCapitalize="none"
        value={email}
        onChangeText={(value) => setEmail(value)}
      />
      <Text>Password:</Text>
      <TextInput
        style={{ borderWidth: 1, borderRadius: 5, padding: 5 }}
        placeholder="Password..."
        secureTextEntry
        value={password}
        onChangeText={(value) => setPassword(value)}
      />
      <Button title="Sign In" onPress={login} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
