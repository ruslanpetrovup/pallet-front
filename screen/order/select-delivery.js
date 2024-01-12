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

const OrderSelectDelivery = () => {
  const isFocusedAccept = useIsFocused();
  const navigation = useNavigation();

  const [radioButtons, setRadioButtons] = useState([
    {
      title: "Самовивіз",
      active: true,
    },
    {
      title: "Прорахувати індивідуально",
      active: false,
    },
  ]);

  const [currentCity, setCurrentCity] = useState("Львів");

  const getCurrectCity = async () => {
    const getDataOrder = await AsyncStorage.getItem("orderData");

    if (!getDataOrder) return;
    const getDataOrderJSON = JSON.parse(getDataOrder);

    if (getDataOrderJSON.city === "") return;
    console.log(getDataOrderJSON.city);
    setCurrentCity(getDataOrderJSON.city);
  };

  useEffect(() => {
    if (isFocusedAccept) {
      getCurrectCity();
    }
  }, [isFocusedAccept]);

  const updateOrder = async () => {
    const getOrder = await AsyncStorage.getItem("orderData");
    const currentDelivery = radioButtons.find((item) => {
      if (item.active) {
        return item.title;
      }
    });
    const newOrderCreate = await AsyncStorage.setItem(
      "orderData",
      JSON.stringify({
        ...JSON.parse(getOrder),
        city: currentCity,
        delivery: currentDelivery.title, //Способ доставки
      })
    );
    if (currentDelivery.title === "Самовивіз") {
      navigation.navigate("order/select-storehouse");
    } else {
      navigation.navigate("order/select-address");
    }
  };

  return (
    <>
      <View>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate("order/accept")}
        >
          <View style={{ flexDirection: "row" }}>
            <BackCatalog />

            <Text style={styles.backText}>Вибір способа доставки </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.selectDeliveryWrapper}>
          <View style={styles.selectDelivery}>
            <Text style={styles.selectDeliveryTitle}>спосіб доставки</Text>

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

        {/* <View style={styles.cityButtonWrapper}>
          <TouchableOpacity
            style={styles.cityButton}
            onPress={() => {
              navigation.navigate("order/select-city");
            }}
          >
            <View style={styles.cityButtonInfo}>
              <View style={styles.cityButtonInfoIcon}>
                <LocationIcon />
              </View>
              <View style={styles.cityButtonInfoContent}>
                <Text style={styles.cityButtonInfoContentText}>Ваше місто</Text>
                <Text style={styles.cityButtonInfoContentCity}>
                  {currentCity === "" ? "Бровари" : currentCity}
                </Text>
              </View>
            </View>
            <View style={styles.cityButtonArrow}>
              <BackCatalog />
            </View>
          </TouchableOpacity>
        </View> */}

        <View style={styles.selectNextWrapper}>
          <TouchableOpacity style={styles.selectNext} onPress={updateOrder}>
            <Text style={styles.selectNextText}>Далі</Text>
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default OrderSelectDelivery;
