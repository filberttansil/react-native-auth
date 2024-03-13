import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Card from "../component/Card";
const API = "https://fakestoreapi.com/products";

interface Product {
  title: string;
  price: number | undefined;
  description: string;
  category: string;
  image: string;
}

const Product = () => {
  const [products, setProducts] = useState(null);
  const initialProductState = {
    title: "",
    price: undefined,
    description: "",
    image: "",
    category: "",
  };
  const [productForm, setProductForm] = useState(initialProductState);
  const handleChangeForm = (key: keyof Product, value: string | number) => {
    console.log(key, value);
    setProductForm({ ...productForm, [key]: value });
  };
  const fetchProducts = async () => {
    try {
      const response = await fetch(API);
      if (!response.ok) throw new Error("Failed to fetch data");
      const responseJSON = await response.json();
      setProducts(responseJSON);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async () => {
    const response = await fetch(API, {
      method: "POST",
      body: JSON.stringify(productForm),
    });
    const responseJSON = await response.json();
    console.log(responseJSON);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{
          backgroundColor: "#fff",
          margin: 16,
          padding: 10,
          borderRadius: 10,
          shadowOffset: { width: 5, height: 5 },
          shadowOpacity: 0.5,
          shadowColor: "gray",
          shadowRadius: 1,
          gap: 5,
        }}
      >
        <Text>Product Name:</Text>
        <TextInput
          style={{ borderWidth: 1, borderRadius: 5, padding: 5 }}
          placeholder="Product Name"
          value={productForm.title}
          onChangeText={(value) => handleChangeForm("title", value)}
        />
        <Text>Price:</Text>
        <TextInput
          style={{ borderWidth: 1, borderRadius: 5, padding: 5 }}
          placeholder="Price"
          keyboardType="number-pad"
          value={productForm.price}
          onChangeText={(value) => handleChangeForm("price", value)}
        />
        <Text>Description:</Text>
        <TextInput
          style={{ borderWidth: 1, borderRadius: 5, padding: 5 }}
          placeholder="Description of the product ..."
          value={productForm.description}
          onChangeText={(value) => handleChangeForm("description", value)}
        />
        <Text>Product ImageUrl:</Text>
        <TextInput
          style={{ borderWidth: 1, borderRadius: 5, padding: 5 }}
          placeholder="Product Image Url..."
          value={productForm.image}
          onChangeText={(value) => handleChangeForm("image", value)}
        />
        <Text>Category:</Text>
        <TextInput
          style={{ borderWidth: 1, borderRadius: 5, padding: 5 }}
          placeholder="Category product"
          value={productForm.category}
          onChangeText={(value) => handleChangeForm("category", value)}
        />
        <Button title="Add Product" onPress={addProduct} />
      </KeyboardAvoidingView>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            image={item.image}
            description={item.description}
            price={item.price}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
  },
});
export default Product;
