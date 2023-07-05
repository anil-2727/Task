import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from "react-native";
import {
  Box,
  FlatList,
  Avatar,
  HStack,
  VStack,
  Spacer,
  Center,
  NativeBaseProvider,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import CartCard from "./CartCard";
import { AntDesign } from "@expo/vector-icons";

const CartScreen = ({ route, navigation }) => {
  console.log(route?.params, "itemm");

  const [data, setData] = useState(route?.params?.selectedItems);
  const [totalPrices, setTotalPrices] = useState([]);
  console.log(totalPrices, "arrayy");

  const numbersArray = [];

  const handleTotalPrice = (price) => {
    // setTotalPrices([...totalPrices, price]);
    console.log(price, "121");
    setTotalPrices(price);
    numbersArray.push(price);
  };

  console.log(numbersArray, "5252");

  return (
    <NativeBaseProvider>
      <View>
        <StatusBar backgroundColor="#87ceeb" />
        <SafeAreaView style={{ flex: 0, backgroundColor: "#87ceeb" }} />
        <View
          style={{
            marginTop: 10,
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 100,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginBottom: 10,
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            <View>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={28} color="black" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignSelf: "center",
                marginLeft: 20,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Cart Screen
              </Text>
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {data && data.length > 0 ? (
              <View>
                <FlatList
                  data={data}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <CartCard
                      brand={item?.brand}
                      category={item?.category}
                      thumbnail={item?.thumbnail}
                      description={item?.description}
                      title={item?.title}
                      price={item?.price}
                      handleTotalPrice={handleTotalPrice}
                    />
                  )}
                />

                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10,
                    backgroundColor: "blue",
                    borderRadius: 10,
                    borderWidth: 0.5,
                    marginTop: 20,
                  }}
                >
                  <TouchableOpacity>
                    <Text style={{ color: "white", fontSize: 16 }}>
                      Order Now
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  marginTop: 100,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Cart is empty
                </Text>
                <AntDesign name="shoppingcart" size={60} color="black" />
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </NativeBaseProvider>
  );
};

export default CartScreen;
