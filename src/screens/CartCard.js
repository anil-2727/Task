/** @format */

import React, { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";

const CartCard = (props) => {
  console.log(props, "props");
  const [count, setCount] = useState(1);
  const handleIncrement = () => {
    setCount(count + 1);
    // props.incrementqty(count + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
      //   props.incrementqty(count - 1);
    }
  };

  const totalPrice = props?.price * count;

  // Call the callback function to send the total price to CartScreen
  props.handleTotalPrice(totalPrice);

  return (
    <View
      style={{
        width: "100%",

        borderWidth: 1,
        borderRadius: 4,
        marginTop: 6,
      }}
    >
      <View
        style={{
          paddingTop: 20,
          paddingLeft: 10,
          paddingRight: 15.24,
          marginBottom: 10,
        }}
      >
        <View style={{ width: "100%" }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "26%" }}>
              <Image
                source={{
                  uri: `${props?.thumbnail}`,
                }}
                style={{ width: 50, height: 50, marginBottom: 13 }}
              ></Image>

              <View
                style={{
                  width: 60,
                  height: 25,
                  borderWidth: 1,
                  borderRadius: 4,
                  marginRight: 10,
                  flexDirection: "row",
                }}
              >
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Pressable onPress={handleDecrement}>
                    <View
                      style={{
                        width: 20,
                        alignItems: "center",
                      }}
                    >
                      <Text>-</Text>
                    </View>
                  </Pressable>

                  <View
                    style={{
                      borderRightWidth: 1,
                      borderLeftWidth: 1,
                      width: 20,
                      alignItems: "center",
                    }}
                  >
                    <Text>{count}</Text>
                  </View>

                  <Pressable onPress={handleIncrement}>
                    <View style={{ width: 20, alignItems: "center" }}>
                      <Text>+</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
            <View style={{ width: "74%" }}>
              <Text
                style={{
                  fontSize: 16,

                  fontWeight: "bold",
                  marginTop: 1,
                }}
              >
                {props?.brand}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                }}
              >
                {props?.title}
              </Text>

              <Text style={{ fontSize: 12 }}>{props.description}</Text>

              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                $ {totalPrice}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartCard;
