import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import styles from "../../style/order";
import { useNavigation } from "@react-navigation/native";
import BackCatalog from "../../assets/Icons/BackCatalog";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchIcon from "../../assets/Icons/SearchIcon";
import { useEffect, useState } from "react";
import SelectAddressIcon from "../../assets/Icons/SelectAddressIcon";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { GOOGLE_KEY } from "@env";

const OrderSelectAddress = () => {
  const navigation = useNavigation();
  const [addressData, setAddressData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [timeoutToClear, setTimeoutToClear] = useState();

  const fakeDelay = (ms) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    return () => {
      clearTimeout(timeoutToClear);
    };
  }, []);

  const debounce = (callback, alwaysCall, ms) => {
    return (...args) => {
      alwaysCall(...args);
      clearTimeout(timeoutToClear);
      setTimeoutToClear(
        setTimeout(() => {
          callback(...args);
        }, ms)
      );
    };
  };

  const setSearchTextAlways = (text) => {
    setSearchInput(text);
  };

  const searchAddress = async (text) => {
    setSearchInput(text);
    await fakeDelay(1000);

    if (text === "") return;
    const codeAddress = encodeURIComponent(text);
    console.log(text);

    try {
      const searchAddressRequest = await axios(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${codeAddress}&key=${GOOGLE_KEY}&radius=500&components=country:ua`
      );

      // console.log(testResult.data.predictions);
      // testResult.data.predictions.forEach((item) => {
      //   console.log(item.structured_formatting.main_text);
      // });

      if (searchAddressRequest.data.predictions.length === 0) return;
      const regex = /\b\d{5}\b|\b\w{1,4}\b(?!\w)/g;

      const newDataAddress = searchAddressRequest.data.predictions.map(
        (item, index) => {
          if (item.structured_formatting.main_text === "") return;
          return {
            id: index,
            address: item.structured_formatting.main_text,
          };
        }
      );
      setAddressData(newDataAddress);
      console.log(newDataAddress);
    } catch (err) {
      console.log(err);
    }
  };

  const debouncedSearchFruits = debounce(
    searchAddress,
    setSearchTextAlways,
    500
  );

  const goToPayment = async (address) => {
    const getOrder = await AsyncStorage.getItem("orderData");
    const newOrderCreate = await AsyncStorage.setItem(
      "orderData",
      JSON.stringify({
        ...JSON.parse(getOrder),
        address: address, // Адрес
        storehouse: "-",
      })
    );
    navigation.navigate("order/select-payment");
  };

  return (
    <>
      <View>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate("order/select-delivery")}
        >
          <View style={{ flexDirection: "row" }}>
            <BackCatalog />

            <Text style={styles.backText}>Ваша Адреса</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.searchAddress}>
          <View style={styles.searchAddressIcon}>
            <SearchIcon />
          </View>
          <TextInput
            placeholder="Введіть адресу"
            value={searchInput}
            onChangeText={(value) => {
              debouncedSearchFruits(value);
            }}
            style={{ width: "100%" }}
          />
        </View>

        <View style={styles.selectAdressWrapper}>
          <KeyboardAwareScrollView>
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
                          Адреса
                        </Text>
                        <Text style={styles.selectAdressItemContentAddress}>
                          {item.address}
                        </Text>
                        {/* <Text style={styles.selectAdressItemContentDay}>
                        {item.schedule}
                      </Text> */}
                      </View>
                    </TouchableOpacity>
                  ))}
                </>
              )}
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>

      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default OrderSelectAddress;
