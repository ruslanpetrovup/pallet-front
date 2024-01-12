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
import MapView, { Marker } from "react-native-maps";
import SearchIcon from "../../assets/Icons/SearchIcon";
import { useEffect, useMemo, useState } from "react";
import SelectAddressIcon from "../../assets/Icons/SelectAddressIcon";
import axios from "axios";
import { SERVER_ADMIN, GOOGLE_KEY } from "@env";

const OrderSelectStorehouse = () => {
  const isFocusedScreen = useIsFocused();
  const navigation = useNavigation();
  const [focusSearch, setFocusSearch] = useState(false);

  const [addressData, setAddressData] = useState([]);

  const getAddress = async () => {
    const currentCity = await AsyncStorage.getItem("orderData");
    const response = await axios(`${SERVER_ADMIN}/api/storehouse`);

    if (response.data.docs.length === 0) return;
    const listStorehouse = response.data.docs;
    // const filterStoreHouse = listStorehouse.filter((item) => {
    //   if (item.city === JSON.parse(currentCity).city) {
    //     return item;
    //   }
    // });
    setAddressData(listStorehouse);
  };

  const goToPayment = async (storehouse) => {
    const getOrder = await AsyncStorage.getItem("orderData");
    await AsyncStorage.setItem(
      "orderData",
      JSON.stringify({
        ...JSON.parse(getOrder),
        storehouse: storehouse, // Адресс склада
        address: "-",
      })
    );
    navigation.navigate("order/select-payment");
  };

  useEffect(() => {
    if (isFocusedScreen) {
      getAddress();
    }
  }, [isFocusedScreen]);
  return (
    <>
      <View>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate("order/select-delivery")}
        >
          <View style={{ flexDirection: "row" }}>
            <BackCatalog />

            <Text style={styles.backText}>Адреса та час роботи</Text>
          </View>
        </TouchableOpacity>

        <ScrollView scrollEnabled>
          <View style={styles.selectAdressWrapper}>
            <View style={styles.selectAdress}>
              {addressData.length === 0 ? (
                <></>
              ) : (
                <>
                  {addressData.map((item) => (
                    <TouchableOpacity
                      style={styles.selectAdressItem}
                      key={item.id}
                      onPress={() => goToPayment(item.address)}
                    >
                      <View style={styles.selectAdressItemIcon}>
                        <SelectAddressIcon />
                      </View>
                      <View style={styles.selectAdressItemContent}>
                        <Text style={styles.selectAdressItemContentText}>
                          Склад:
                        </Text>
                        <Text style={styles.selectAdressItemContentAddress}>
                          {item.city} {item.address}
                        </Text>
                        <Text style={styles.selectAdressItemContentDay}>
                          {item.schedule}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </View>

      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default OrderSelectStorehouse;
