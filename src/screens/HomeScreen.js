import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  StatusBar,
  ActivityIndicator,
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
import { AntDesign } from "@expo/vector-icons";

const ItemListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [count, setCount] = useState(0);

  const [data, setData] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const result = await fetch("https://dummyjson.com/products");
      if (result) {
        const json = await result.json();
        setData(json.products);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const filteredItems = data.filter((data) =>
    data.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const clickedButton = (id) => {
  //   setClicked(!clicked);
  // };

  const clickedButton = (id) => {
    const updatedItems = data.map((item) =>
      item.id === id ? { ...item, clicked: !item.clicked } : item
    );
    setData(updatedItems);
    const selectedItems = updatedItems.filter((item) => item.clicked);

    const newSelectedItems = updatedItems.filter((item) => item.clicked);
    setSelectedItems(newSelectedItems);

    const newCount = selectedItems.length;
    setCount(newCount);
  };

  return (
    <NativeBaseProvider>
      <StatusBar backgroundColor="#87ceeb" />
      <SafeAreaView style={{ flex: 0, backgroundColor: "#87ceeb" }} />
      <View
        style={{
          marginTop: 10,
          marginLeft: 20,
          marginRight: 20,
          paddingBottom: 120,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            marginBottom: 10,
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>App Name</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("CartScreen", { selectedItems })
              }
            >
              <AntDesign name="shoppingcart" size={24} color="black" />
              {count > 0 && (
                <View
                  style={{
                    position: "absolute",
                    top: -5,
                    right: -10,
                    backgroundColor: "red",
                    borderRadius: 10,
                    width: 20,
                    height: 20,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 12 }}>{count}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 5,
            marginTop: 5,
            marginBottom: 10,
          }}
        >
          <TextInput
            style={{ margin: Platform.OS === "ios" ? 10 : 5 }}
            placeholder="search"
            placeholderTextColor="black"
            onChangeText={handleSearch}
            value={searchQuery}
          />
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#87ceeb" />
        ) : (
          <FlatList
            data={filteredItems}
            renderItem={({ item }) => (
              <Box
                borderBottomWidth="1"
                _dark={{
                  borderColor: "muted.50",
                }}
                borderColor="muted.800"
                pl={["0", "4"]}
                pr={["0", "5"]}
                py="2"
              >
                <HStack>
                  <VStack
                    style={{
                      width: "25%",
                      justifyContent: "center",
                      paddingLeft: 5,
                    }}
                  >
                    <Avatar
                      size="lg"
                      source={{
                        uri: `${item?.thumbnail}`,
                      }}
                    />
                  </VStack>
                  <VStack
                    width="70%"
                    style={{
                      margin: Platform.OS === "ios" ? 5 : 2,
                      with: "40%",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                      {item.brand}
                    </Text>
                    <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                      {item.title}
                    </Text>
                    <Text style={{ fontSize: 12 }}>{item.description}</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                      {item.price}$
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingTop: 10,
                      }}
                    >
                      {item.clicked ? (
                        <TouchableOpacity
                          onPress={() => clickedButton(item.id)}
                        >
                          <View
                            style={{
                              backgroundColor: "blue",
                              padding: 5,
                              paddingLeft: 10,
                              paddingRight: 10,
                              borderRadius: 10,
                              borderWidth: 1,
                            }}
                          >
                            <Text style={{ color: "white" }}>
                              Added to Cart
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => clickedButton(item.id)}
                        >
                          <View
                            style={{
                              backgroundColor: "#87ceeb",
                              padding: 5,
                              paddingLeft: 10,
                              paddingRight: 10,
                              borderRadius: 10,
                              borderWidth: 1,
                            }}
                          >
                            <Text style={{ color: "white" }}>Add to Cart</Text>
                          </View>
                        </TouchableOpacity>
                      )}
                      {/* {item.clicked ? (
                      <View
                        style={{
                          flexDirection: "row",
                          backgroundColor: "#87ceeb",
                          borderWidth: 1,
                          borderRadius: 10,
                          justifyContent: "space-between",
                        }}
                      >
                        <View
                          style={{
                            marginLeft: 10,
                            marginRight: 10,
                            justifyContent: "center",
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => decreaseCount(item.id)}
                          >
                            <Text style={{ color: "white" }}>-</Text>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            backgroundColor: "white",
                            paddingLeft: 5,
                            paddingRight: 5,
                            justifyContent: "center",
                          }}
                        >
                          <Text>{item.count || 0}</Text>
                        </View>
                        <View
                          style={{
                            marginLeft: 10,
                            marginRight: 10,
                            justifyContent: "center",
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => increaseCount(item.id)}
                          >
                            <Text style={{ color: "white" }}>+</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : null} */}
                    </View>
                  </VStack>
                  <Spacer />
                </HStack>
              </Box>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </View>
    </NativeBaseProvider>
  );
};

export default ItemListScreen;
