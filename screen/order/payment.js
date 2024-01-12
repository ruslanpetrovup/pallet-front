import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  StatusBar,
} from "react-native";
import styles from "../../style/order";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import BackCatalog from "../../assets/Icons/BackCatalog";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LocationIcon from "../../assets/Icons/LocationIcon";
import { useEffect, useState } from "react";
import CloseBasket from "../../assets/Icons/CloseBasket";
import { SERVER_ADMIN } from "@env";

const OrderSelectPayment = () => {
  const isFocusedAccept = useIsFocused();
  const navigation = useNavigation();

  const [radioButtons, setRadioButtons] = useState([
    {
      title: "Готівкою при отриманні",
      active: true,
    },
    {
      title: "Безготівковими для юридичних осіб",
      active: false,
    },
  ]);

  const updateOrder = async (payment) => {
    const getOrder = await AsyncStorage.getItem("orderData");
    const currentPayment = radioButtons.find((item) => item.active === true);

    const newOrderCreate = await AsyncStorage.setItem(
      "orderData",
      JSON.stringify({
        ...JSON.parse(getOrder),
        paymentSelect: currentPayment.title, // Адресс склада
      })
    );
    navigation.navigate("order/select-date");
  };

  const getCurrentPayment = async () => {
    const getOrder = await AsyncStorage.getItem("orderData");
    if (!getOrder) return;

    if (JSON.parse(getOrder).paymentSelect === "") return;

    const newCurrentPayment = radioButtons.map((item) => {
      if (item.title === JSON.parse(getOrder).paymentSelect) {
        return {
          title: item.title,
          active: true,
        };
      } else {
        return {
          title: item.title,
          active: false,
        };
      }
    });
    setRadioButtons(newCurrentPayment);
  };
  useEffect(() => {
    if (isFocusedAccept) {
      getCurrentPayment();
    }
  }, [isFocusedAccept]);
  return (
    <>
      <View>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate("order/select-address")}
        >
          <View style={{ flexDirection: "row" }}>
            <BackCatalog />

            <Text style={styles.backText}>Вибір способа оплати </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.selectDeliveryWrapper}>
          <View style={styles.selectDelivery}>
            <Text style={styles.selectDeliveryTitle}>спосіб оплати</Text>

            <View style={styles.selectDeliveryContent}>
              {radioButtons.map((item) => (
                <TouchableOpacity
                  key={item.title}
                  style={styles.selectDeliveryItem}
                  onPress={() => {
                    const newButtons = radioButtons.map((el) => {
                      if (item.title === el.title) {
                        return { ...el, active: true };
                      } else {
                        return { ...el, active: false };
                      }
                    });
                    setRadioButtons(newButtons);
                  }}
                >
                  <View style={styles.selectDeliveryItemRadio(item.active)}>
                    <View
                      style={styles.selectDeliveryItemRadioMarker(item.active)}
                    ></View>
                  </View>
                  <Text style={styles.selectDeliveryItemTitle}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.selectNextWrapper}>
          <TouchableOpacity style={styles.selectNext} onPress={updateOrder}>
            <Text style={styles.selectNextText}>Вибрати</Text>
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default OrderSelectPayment;
