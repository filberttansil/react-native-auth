import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (
    username: string,
    email: string,
    password: string,
    phoneNumber: string,
    address: string
  ) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "access_token";
export const API_URL = "http://localhost:3000";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({ token: null, authenticated: null });
  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log(`stored token : ${token}`);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({ token, authenticated: true });
      }
    };
    loadToken();
  }, []);

  const register = async (
    username: string,
    email: string,
    password: string,
    phoneNumber: string,
    address: string
  ) => {
    try {
      return await axios.post(`${API_URL}/pub/register`, {
        username,
        email,
        password,
        phoneNumber,
        address,
      });
    } catch (error) {
      return { error: true, msg: (error as any).response.data.msg };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/pub/login`, {
        email,
        password,
      });
      console.log(response.data.access_token);
      setAuthState({ token: response.data.access_token, authenticated: true });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, response.data.access_token);

      return response;
    } catch (error) {
      return { error: true, msg: (error as any).response.data.message };
    }
  };

  const logout = async () => {
    // Delete token from Storage
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    // Update HTTP Headers
    axios.defaults.headers.common["Authorization"] = "";

    // Reset Auth State
    setAuthState({
      token: null,
      authenticated: false,
    });
  };
  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
