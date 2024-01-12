import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import styles from "../../style/order";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import BackCatalog from "../../assets/Icons/BackCatalog";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import CloseBasket from "../../assets/Icons/CloseBasket";
import { SERVER_ADMIN } from "@env";
import useVerify from "../../components/hook/useVerify";

const OrderAccept = () => {
  const navigation = useNavigation();
  const isFocusedScreen = useIsFocused();
  const [basketData, setBasketData] = useState([]);

  useEffect(() => {
    if (isFocusedScreen) {
      AsyncStorage.getItem("basket").then((value) => {
        if (!value) return;
        const result = JSON.parse(value);
        setBasketData(result);
      });
    }
  }, [isFocusedScreen]);

  const deleteBasket = async (id) => {
    const basket = await AsyncStorage.getItem("basket");
    const list = JSON.parse(basket);

    const result = list.filter((item) => item.id !== id);

    await AsyncStorage.setItem("basket", JSON.stringify(result));

    setBasketData(result);
  };

  const changeInput = async (value, id) => {
    const newValue = value.replace(/[^0-9]/g, "");
    const newBasket = basketData.map((item) => {
      if (item.id === id) return { ...item, score: newValue };
      return item;
    });
    setBasketData(newBasket);
    await AsyncStorage.setItem("basket", JSON.stringify(newBasket));
  };

  const createOrder = async () => {
    const getBasket = await AsyncStorage.getItem("basket");
    const checkUser = await useVerify();

    if (!checkUser.verify) {
      return navigation.navigate("login", { prevScreen: "order/accept" });
    }
    const newOrderCreate = await AsyncStorage.setItem(
      "orderData",
      JSON.stringify({
        id: "", //Ид заказа
        idUser: "", //Ид пользователя
        statusOrder: "", // Статус заказа
        city: "Бровари", //Город заказа
        delivery: "", //Способ доставки
        address: "", // Адресс склада
        paymentSelect: "", //Способ оплаты
        dateSend: "", //Дата отправки
        dateCreate: "", //Дата создания заказа
        products: [...JSON.parse(getBasket)], //Список товаров
      })
    );
    navigation.navigate("order/select-delivery");
  };
  return (
    <>
      <View>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate("basket")}
        >
          <View style={{ flexDirection: "row" }}>
            <BackCatalog />

            <Text style={styles.backText}>Оформлення замовлення </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.title}>
          <Text style={styles.titleText}>Замовлення</Text>
        </View>

        <View style={styles.basket}>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {basketData.length !== 0 ? (
              <>
                <View style={styles.basketList}>
                  {basketData.map((item, index) => (
                    <View key={index} style={styles.basketItem}>
                      <Image
                        source={{
                          uri: `${SERVER_ADMIN}/media/${item.images[0].catalog.filename}`,
                        }}
                        resizeMode="center"
                        style={styles.basketImage}
                      />
                      <View style={styles.basketContent}>
                        <Text style={styles.basketContentTitle}>
                          {item.name}
                        </Text>
                        <Text style={styles.basketContentDesc}>
                          {item.span}
                        </Text>
                        <View style={styles.basketContentBonus}>
                          <View style={styles.basketContentBonusBlock}>
                            <Text style={styles.basketContentBonusScore}>
                              + {String(Number(item.score) * 1)}{" "}
                            </Text>
                            <Text style={styles.basketContentBonusText}>
                              балів
                            </Text>
                          </View>
                          <TextInput
                            onChangeText={(value) =>
                              changeInput(value, item.id)
                            }
                            style={styles.basketContentBonusInput}
                            value={String(item.score)}
                            onBlur={async (event) => {
                              if (event.nativeEvent.text === "") {
                                const newBasket = basketData.map((el) => {
                                  if (el.id === item.id)
                                    return { ...item, score: "1" };
                                  return item;
                                });
                                setBasketData(newBasket);
                                await AsyncStorage.setItem(
                                  "basket",
                                  JSON.stringify(newBasket)
                                );
                              }
                            }}
                          />
                        </View>
                      </View>
                      {basketData.length === 1 ? (
                        <></>
                      ) : (
                        <TouchableOpacity
                          style={styles.basketContentClose}
                          onPress={() => deleteBasket(item.id)}
                        >
                          <CloseBasket />
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}
                </View>
              </>
            ) : (
              <View style={styles.basketNull}>
                <BasketNull />
                <Text style={styles.basketNullTitle}>Кошик порожній</Text>
                <Text
                  style={styles.basketNullDesc}
                >{`Але це ніколи не пізно виправити :)`}</Text>
              </View>
            )}
          </ScrollView>
        </View>
        <View style={styles.acceptButtonWrapper}>
          <TouchableOpacity onPress={createOrder} style={styles.acceptButton}>
            <Text style={styles.basketButtonOrderText}>
              Підтвердити замовлення
            </Text>
          </TouchableOpacity>
          <View style={{ marginTop: 30, alignItems: "center" }}>
            <Text style={styles.text}>Підтверджуючи замовлення, я приймаю</Text>
            <Text style={styles.linkText}>
              умови положення про обробку і захист персональних даних та угодою
              користувача
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default OrderAccept;
