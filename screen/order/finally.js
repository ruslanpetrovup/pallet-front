import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  ScrollView,
  Image,
} from "react-native";
import styles from "../../style/order";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { SERVER_ADMIN } from "@env";
import BackCatalog from "../../assets/Icons/BackCatalog";

import testOrder from "../../assets/images/profile/testOrder.jpg";
import stylesOrder from "../../style/profile/profile-order";

import Navigation from "../../components/Navigation";
import backgroundOrder from "../../assets/images/orderbackground-2.jpg";
import axios from "axios";
import useVerify from "../../components/hook/useVerify";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const OrderSelectFinally = () => {
  const isFocusedAccept = useIsFocused();
  const navigation = useNavigation();
  const [dataOrder, setDataOrder] = useState(null);

  // const getOrder = async () => {
  //   const getDataOrder = await AsyncStorage.getItem("orderData");
  //   console.log(JSON.parse(getDataOrder));
  //   setDataOrder(JSON.parse(getDataOrder));
  //   await AsyncStorage.setItem("basket", JSON.stringify([]));
  // };

  const getOrder = async () => {
    const getDataOrder = await AsyncStorage.getItem("orderData");
    try {
      const result = await axios.get(
        `${SERVER_ADMIN}/api/orders/${JSON.parse(getDataOrder).id}`
      );
      console.log(result);
      setDataOrder(result.data);
      await AsyncStorage.setItem("basket", JSON.stringify([]));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isFocusedAccept) {
      getOrder();
    }
  }, [isFocusedAccept]);

  const addDashEveryThirdCharacter = (inputString) => {
    const regex = /(.{3})/g;
    const result = inputString.replace(regex, "$1-");

    return result.slice(0, -1);
  };

  const addSpaceEveryThirdCharacter = (inputString) => {
    var regex = /(.{3})(?!$)/g;
    var result = inputString.replace(regex, "$1 ");

    return result;
  };

  const statusOrderGet = (value) => {
    if (value === "loading") {
      return { message: "В процесі оброблення", color: "#FFB21D" };
    } else if (value === "accept") {
      return { message: "Виконано", color: "#27AA80" };
    } else if (value === "rejected") {
      return { message: "Відхилено замовником", color: "#D6D6D6" };
    }
  };
  return (
    <>
      <View style={styles.finallyWrapper}>
        <View style={styles.finally}>
          <ImageBackground style={styles.finallyImage} source={backgroundOrder}>
            {/* <Text style={styles.finallyText}>Дякуємо за замовлення!</Text> */}
          </ImageBackground>
        </View>
      </View>

      <View style={styles.messageFinally}>
        <Text style={styles.messageFinallyTitle}>
          Ваше замовлення прийнято!
        </Text>
        <Text style={styles.messageFinallyText}>
          Наш менеджер зв’яжеться з Вами по телефону чи відправивши SMS або
          Viber-повідомлення.
        </Text>
      </View>

      <KeyboardAwareScrollView contentContainerStyle={{ paddingBottom: 150 }}>
        <View style={styles.orderFinallyWrapper}>
          {dataOrder !== null ? (
            <>
              <TouchableOpacity
                // style={styles.orderFinally}
                onPress={() =>
                  navigation.navigate("profile/order/details", {
                    id: dataOrder.id,
                  })
                }
              >
                <View style={stylesOrder.orders(16)}>
                  <View style={stylesOrder.ordersWrapper}>
                    <View style={stylesOrder.ordersWrapperInfo}>
                      <View style={stylesOrder.ordersWrapperInfoBlock}>
                        <Text style={stylesOrder.ordersWrapperInfoNumber}>
                          № {addSpaceEveryThirdCharacter(dataOrder.id)}
                        </Text>
                        <Text style={stylesOrder.ordersWrapperInfoDate}>
                          від {dataOrder.dateCreate}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("profile/order/details", {
                            id: dataOrder.id,
                          })
                        }
                        style={stylesOrder.ordersWrapperInfoButton}
                      >
                        <BackCatalog />
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={stylesOrder.ordersWrapperStatus(
                        statusOrderGet(dataOrder.statusOrder).color
                      )}
                    >
                      {statusOrderGet(dataOrder.statusOrder).message}
                    </Text>

                    <View style={stylesOrder.orderWrapperItemGap}>
                      {dataOrder.products.map((product) => (
                        <View
                          style={stylesOrder.orderWrapperItem}
                          key={product.id}
                        >
                          <Image
                            style={stylesOrder.orderWrapperItemImage}
                            source={testOrder}
                          />
                          <View style={stylesOrder.orderWrapperItemInfo}>
                            <Text style={stylesOrder.orderWrapperItemInfoTitle}>
                              {product.name}
                            </Text>
                            <View style={stylesOrder.orderWrapperItemInfoBlock}>
                              <Text
                                style={
                                  stylesOrder.orderWrapperItemInfoBlockText
                                }
                              >
                                Кількість:
                              </Text>
                              <Text
                                style={stylesOrder.orderWrapperItemInfoBlockScore()}
                              >
                                {product.score} од.
                              </Text>
                            </View>
                            <View style={stylesOrder.orderWrapperItemInfoBlock}>
                              {product.statusPayment === "accept" ? (
                                <>
                                  <Text
                                    style={
                                      stylesOrder.orderWrapperItemInfoBlockText
                                    }
                                  >
                                    Статус оплати:
                                  </Text>
                                  <Text
                                    style={stylesOrder.orderWrapperItemInfoBlockScore(
                                      true
                                    )}
                                  >
                                    Оплачене
                                  </Text>
                                </>
                              ) : (
                                <>
                                  <Text
                                    style={
                                      stylesOrder.orderWrapperItemInfoBlockText
                                    }
                                  >
                                    Статус оплати:
                                  </Text>
                                  <Text
                                    style={{
                                      ...stylesOrder.orderWrapperItemInfoBlockScore(
                                        true
                                      ),
                                      color: "#FFB21D",
                                    }}
                                  >
                                    Не оплачене
                                  </Text>
                                </>
                              )}
                            </View>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <></>
          )}
        </View>

        <View style={styles.orderButtonsWrapper}>
          <TouchableOpacity
            style={styles.orderButtonGoOrders}
            onPress={() => {
              navigation.navigate("profile/order");
            }}
          >
            <Text style={styles.orderButtonText}>Мої замовлення</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.orderButtonGoCatalog}
            onPress={() => {
              navigation.navigate("home");
            }}
          >
            <Text style={styles.orderButtonText}>Продовжити покупки</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      <StatusBar barStyle="dark-content" />
      <Navigation />
    </>
  );
};

export default OrderSelectFinally;

{
  /* <TouchableOpacity
style={styles.orderFinally}
onPress={() =>
  navigation.navigate("profile/order/details", { id: dataOrder.id })
}
>
<View style={styles.orderFinallyBlock}>
  <Text style={styles.orderFinallyNumber}>
    № {dataOrder ? addDashEveryThirdCharacter(dataOrder.id) : ""}
  </Text>
  <Text style={styles.orderFinallyDate}>
    від {dataOrder ? dataOrder.dateCreate : ""}
  </Text>
</View>
<View style={styles.orderFinallyNotification}>
  <Text
    style={{
      ...styles.orderFinallyNotificationText,
      color: "#FFC95C",
    }}
  >
    Нове замовлення
  </Text>
</View>
<View style={styles.orderFinallyProductsBlock}>
  {dataOrder ? (
    <>
      {dataOrder.products.map((item) => (
        <View style={styles.orderFinallyProducts} key={item.id}>
          <View style={styles.orderFinallyProductsTitle}>
            <Text style={styles.orderFinallyNotificationText}>
              {item.name}
            </Text>
          </View>
          <View style={styles.orderFinallyProductsTitle}>
            <Text style={styles.orderFinallyNotificationText}>
              {item.score} шт
            </Text>
          </View>
        </View>
      ))}
    </>
  ) : (
    <></>
  )}
</View>
</TouchableOpacity> */
}
