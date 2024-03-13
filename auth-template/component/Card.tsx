import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
interface Props {
  title: string;
  image: string;
  price: number;
  description: string;
}
const Card = ({ title, image, price, description }: Props) => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        marginHorizontal: 20,
        borderRadius: 16,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.5,
        shadowColor: "gray",
        shadowRadius: 1,
      }}
    >
      <Image
        style={{ height: 300 }}
        source={{ uri: image }}
        resizeMode="contain"
      />

      <View style={{ padding: 16, gap: 10 }}>
        <Text style={{ textAlign: "right", fontWeight: "bold", fontSize: 20 }}>
          {price}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{title}</Text>
        <Text style={{ fontSize: 12, color: "gray" }}>{description}</Text>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({});
