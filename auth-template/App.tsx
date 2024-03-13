import { AuthProvider } from "./context/AuthContext";
import Navigator from "./navigations/Navigator";
const API = "https://fakestoreapi.com/products";

export default function App() {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
}
