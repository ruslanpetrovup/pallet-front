import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Navigation from "../components/Navigation";

const Sign = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={{ paddingTop: 50, width: "100%" }}>
        <View style={{ paddingHorizontal: 8 }}>
          <Text style={{ fontSize: 20, lineHeight: 24, fontWeight: "500" }}>
            Контактні дані
          </Text>
        </View>

        <View
          style={{
            marginHorizontal: 8,
            borderRadius: 4,
            paddingTop: 16,
            paddingBottom: 27,
            paddingHorizontal: 10,
            backgroundColor: "#FFFFFF",
            shadowColor: "#000000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.14,
            shadowRadius: 5,
            elevation: 1,
            borderRadius: 4,
            marginTop: 18,
          }}
        >
          <Text
            style={{
              fontSize: 11,
              fontWeight: "400",
              lineHeight: 16,
              color: "#272727",
              textAlign: "center",
              marginBottom: 22,
            }}
          >
            Авторизація прискорить оформлення замовлення і дозволить
            відстежувати інформацію в особистому кабінеті
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("login")}
            style={{
              paddingVertical: 14,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFFFFF",
              borderColor: "#272727",
              borderWidth: 1,
              borderRadius: 4,
              marginHorizontal: 25,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                lineHeight: 16,
                color: "#272727",
                textTransform: "uppercase",
              }}
            >
              Увійти в магазин
            </Text>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            fontSize: 13,
            lineHeight: 17,
            fontWeight: "600",
            marginTop: 30,
            marginLeft: 8,
          }}
        >
          Або стати новим покупцем
        </Text>

        <View style={{ marginTop: 30, paddingHorizontal: 8, gap: 25 }}>
          <View style={{ position: "relative" }}>
            <Text
              style={{
                paddingHorizontal: 4,
                fontSize: 12,
                lineHeight: 16,
                fontWeight: "600",
                color: "rgba(0, 0, 0, 0.6)",
                backgroundColor: "white",
                position: "absolute",
                top: -8,
                left: 9,
                zIndex: 2,
              }}
            >
              Ваше ім’я
            </Text>
            <TextInput
              style={{
                paddingVertical: 20,
                paddingLeft: 16,
                borderColor: "#B3B0AF",
                borderWidth: 1.5,
                borderRadius: 4,
              }}
            />
          </View>
          <View style={{ position: "relative" }}>
            <Text
              style={{
                paddingHorizontal: 4,
                fontSize: 12,
                lineHeight: 16,
                fontWeight: "600",
                color: "rgba(0, 0, 0, 0.6)",
                backgroundColor: "white",
                position: "absolute",
                top: -8,
                left: 9,
                zIndex: 2,
              }}
            >
              Прізвище
            </Text>
            <TextInput
              style={{
                paddingVertical: 20,
                paddingLeft: 16,
                borderColor: "#B3B0AF",
                borderWidth: 1.5,
                borderRadius: 4,
              }}
            />
          </View>
          <View style={{ position: "relative" }}>
            <Text
              style={{
                paddingHorizontal: 4,
                fontSize: 12,
                lineHeight: 16,
                fontWeight: "600",
                color: "rgba(0, 0, 0, 0.6)",
                backgroundColor: "white",
                position: "absolute",
                top: -8,
                left: 9,
                zIndex: 2,
              }}
            >
              Телефон
            </Text>
            <TextInput
              style={{
                paddingVertical: 20,
                paddingLeft: 16,
                borderColor: "#B3B0AF",
                borderWidth: 1.5,
                borderRadius: 4,
              }}
            />
          </View>

          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 4,
              backgroundColor: "#272727",
              paddingVertical: 16,
              elevation: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.14,
              shadowRadius: 5,
              elevation: 1,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.12,
              shadowRadius: 10,
              elevation: 2,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.2,
              shadowRadius: 4,
            }}
          >
            <Text
              style={{
                fontSize: 11,
                lineHeight: 16,
                fontWeight: "600",
                color: "white",
                textTransform: "uppercase",
              }}
            >
              Продовжити
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Navigation />
    </>
  );
};

export default Sign;
