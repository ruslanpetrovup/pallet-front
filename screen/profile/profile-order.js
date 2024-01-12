import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import Navigation from "../../components/Navigation";
import { StatusBar } from "react-native";
import styles from "../../style/profile/profile-order";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import BackCatalog from "../../assets/Icons/BackCatalog";
import testOrder from "../../assets/images/profile/testOrder.jpg";
import { useEffect, useState } from "react";
import useVerify from "../../components/hook/useVerify";
import axios from "axios";
import { SERVER_ADMIN } from "@env";

const ProfileOrder = () => {
  const navigation = useNavigation();
  const isFocusedScreen = useIsFocused();
  const [ordersData, setOrdersData] = useState([]);

  const getOrders = async () => {
    const getUser = await useVerify();

    if (getUser.dataFetch.orderHistory.length === 0) {
      return;
    }
    await Promise.all(
      getUser.dataFetch.orderHistory.map(async (item) => {
        const responseOrder = await axios.get(
          `${SERVER_ADMIN}/api/orders/${item}`
        );
        return responseOrder.data;
      })
    ).then((data) => {
      console.log(data[data.length - 1].statusPayment);
      setOrdersData(data.reverse());
    });
  };

  useEffect(() => {
    if (isFocusedScreen) {
      getOrders();
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
  return (
    <>
      <View>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate("profile")}
        >
          <View style={{ flexDirection: "row" }}>
            <BackCatalog />

            <Text style={styles.backText}>Мої замовлення</Text>
          </View>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
          <View style={styles.orders(16)}>
            {ordersData.map((item) => (
              <View style={styles.ordersWrapper} key={item.id}>
                <View style={styles.ordersWrapperInfo}>
                  <View style={styles.ordersWrapperInfoBlock}>
                    <Text style={styles.ordersWrapperInfoNumber}>
                      № {addSpaceEveryThirdCharacter(item.id)}
                    </Text>
                    <Text style={styles.ordersWrapperInfoDate}>
                      від {item.dateCreate}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("profile/order/details", {
                        id: item.id,
                      })
                    }
                    style={styles.ordersWrapperInfoButton}
                  >
                    <BackCatalog />
                  </TouchableOpacity>
                </View>
                <Text
                  style={styles.ordersWrapperStatus(
                    statusOrderGet(item.statusOrder).color
                  )}
                >
                  {statusOrderGet(item.statusOrder).message}
                </Text>

                <View style={styles.orderWrapperItemGap}>
                  {item.products.map((product) => (
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
            ))}
          </View>
        </ScrollView>
      </View>
      <Navigation active="profile" />
      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default ProfileOrder;
