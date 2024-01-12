import { View, Text, TouchableOpacity, Image } from "react-native";

import Navigation from "../../components/Navigation";
import { StatusBar } from "react-native";
import styles from "../../style/profile/profile-order";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import BackCatalog from "../../assets/Icons/BackCatalog";
import testOrder from "../../assets/images/profile/testOrder.jpg";
import CopyIcon from "../../assets/Icons/CopyIcon";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_ADMIN } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileOrderDetails = () => {
  const navigation = useNavigation();
  const isFocusedScreen = useIsFocused();
  const router = useRoute();

  const [orderData, setOrderData] = useState({});

  const getOrder = async () => {
    try {
      const result = await axios.get(
        `${SERVER_ADMIN}/api/orders/${router?.params?.id}`
      );
      // console.log(result);
      setOrderData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isFocusedScreen) {
      getOrder();
    }
  }, [isFocusedScreen]);

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

  const againRequestOrder = async () => {
    await AsyncStorage.setItem(
      "orderData",
      JSON.stringify({
        id: "", //Ид заказа
        idUser: orderData.againData.iduser,
        statusOrder: "В процесі оброблення",
        city: orderData.againData.city,
        delivery: orderData.againData.delivery,
        address: orderData.againData.address,
        paymentSelect: orderData.againData.paymentSelect,
        dateSend: "",
        dateCreate: "",
        products: [...orderData.againData.products],
      })
    );
    navigation.navigate("order/select-date");
  };

  return (
    <>
      <View>
        <View style={styles.back}>
          <TouchableOpacity
            onPress={() => navigation.navigate("profile/order")}
            style={{ flexDirection: "row" }}
          >
            <BackCatalog />
            <Text style={styles.backText}>
              {Object.keys(orderData).length === 0
                ? ""
                : `№ ${addSpaceEveryThirdCharacter(orderData.id)}`}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log(orderData.id);
              // Clipboard.setString(orderData.id);
            }}
          >
            <CopyIcon />
          </TouchableOpacity>
        </View>
        {Object.keys(orderData).length === 0 ? (
          <></>
        ) : (
          <>
            <View style={styles.orderDetailsButtonWrapper}>
              <TouchableOpacity
                style={styles.orderDetailsButton}
                onPress={() => againRequestOrder()}
              >
                <Text style={styles.orderDetailsButtonText}>
                  Повторити замовлення
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.orderDetailsButtonSecond}>
              <Text style={styles.orderDetailsButtonText}>Залишити відгук</Text>
            </TouchableOpacity>
            <View style={styles.orders()}>
              <View style={styles.ordersWrapper}>
                <View style={styles.ordersWrapperInfo}>
                  <View style={styles.ordersWrapperInfoBlock}>
                    <Text style={styles.ordersWrapperInfoNumber}>
                      № {addSpaceEveryThirdCharacter(orderData.id)}
                    </Text>
                    <Text style={styles.ordersWrapperInfoDate}>
                      від {orderData.dateCreate}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.ordersWrapperInfoButton}>
                    <BackCatalog />
                  </TouchableOpacity>
                </View>
                <Text
                  style={styles.ordersWrapperStatus(
                    statusOrderGet(orderData.statusOrder).color
                  )}
                >
                  {statusOrderGet(orderData.statusOrder).message}
                </Text>
                <View style={styles.orderWrapperItemGap}>
                  {orderData.products.map((product) => (
                    <View style={styles.orderWrapperItem} key={product.id}>
                      <Image
                        style={styles.orderWrapperItemImage}
                        source={testOrder}
                      />
                      <View style={styles.orderWrapperItemInfo}>
                        <Text style={styles.orderWrapperItemInfoTitle}>
                          {product.name}
                        </Text>
                        <View style={styles.orderWrapperItemInfoBlock}>
                          <Text style={styles.orderWrapperItemInfoBlockText}>
                            Кількість:
                          </Text>
                          <Text style={styles.orderWrapperItemInfoBlockScore()}>
                            {product.score} од.
                          </Text>
                        </View>
                        <View style={styles.orderWrapperItemInfoBlock}>
                          {product.statusPayment === "accept" ? (
                            <>
                              <Text
                                style={styles.orderWrapperItemInfoBlockText}
                              >
                                Статус оплати:
                              </Text>
                              <Text
                                style={styles.orderWrapperItemInfoBlockScore(
                                  true
                                )}
                              >
                                Оплачене
                              </Text>
                            </>
                          ) : (
                            <>
                              <Text
                                style={styles.orderWrapperItemInfoBlockText}
                              >
                                Статус оплати:
                              </Text>
                              <Text
                                style={{
                                  ...styles.orderWrapperItemInfoBlockScore(
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
            <View style={styles.details}>
              {/* <View style={styles.detailsItem}>
                <Text style={styles.detailsItemTitle}>Вартість товару</Text>
                <Text style={styles.detailsItemScore}>24 500₴</Text>
              </View> */}
              <View style={styles.detailsItem}>
                <Text style={styles.detailsItemTitle}>Тип Оплати</Text>
                <Text style={styles.detailsItemScore}>
                  {orderData?.paymentSelect}
                </Text>
              </View>
              <View style={styles.detailsItem}>
                <Text style={styles.detailsItemTitle}>Дата доставки </Text>
                <Text style={styles.detailsItemScore}>
                  {orderData?.dateSend}
                </Text>
              </View>
              <View style={styles.detailsItem}>
                <Text style={styles.detailsItemTitle}>Доставка</Text>
                <Text style={styles.detailsItemScore}>Безкоштовна</Text>
              </View>
              <View style={styles.detailsItem}>
                <Text style={styles.detailsItemTitle}>Загальна вартість</Text>
                <Text style={styles.detailsItemScore}>24 500₴</Text>
              </View>
              <View style={styles.detailsItemSecond}>
                <Text style={styles.detailsItemTitle}>Деталі замовлення:</Text>
                <Text style={styles.detailsItemScore}>
                  Самовивіз зі складу м. Бровари
                </Text>
              </View>
            </View>
          </>
        )}
      </View>
      <Navigation active="profile" />
      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default ProfileOrderDetails;
