import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
} from "react-native";
import BackCatalog from "../assets/Icons/BackCatalog";
import Swiper from "react-native-swiper";
import normal from "../style/normal";
import styles from "../style/catalog-item";
import CatalogItemImg from "../assets/catalog-item.png";
import Navigation from "../components/Navigation";
import ShopIcon from "../assets/Icons/ShopIcon";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SERVER_ADMIN } from "@env";

const CatalogItem = () => {
  const isFocusScreen = useIsFocused();
  const navigation = useNavigation();
  const router = useRoute();
  const [isBasket, setIsBasket] = useState(false);
  const [catalogData, setCatalogData] = useState({});

  // console.log(router.params);

  const addHistory = async (data) => {
    const getHistory = await AsyncStorage.getItem("catalogHistory");

    if (!getHistory) {
      return;
    }
    const checkBackset = JSON.parse(getHistory).find(
      (item) => item.id === data.id
    );
    if (checkBackset !== undefined) return;
    await AsyncStorage.setItem(
      "catalogHistory",
      JSON.stringify([...JSON.parse(getHistory), data])
    );

    return;
  };

  const requestCatalog = async () => {
    try {
      const getCatalog = await axios.get(
        `${SERVER_ADMIN}/api/products/${router.params.id}`
      );
      setCatalogData(getCatalog.data);
      addHistory(getCatalog.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isFocusScreen) {
      requestCatalog();
    }
  }, [isFocusScreen]);

  const addBasketItem = async () => {
    const basket = await AsyncStorage.getItem("basket");
    if ((!basket === JSON.parse(basket).length) === 0) {
      AsyncStorage.setItem(
        "basket",
        JSON.stringify([
          {
            ...catalogData,
            score: "1",
          },
        ])
      );
      return;
    }

    const result = [
      ...JSON.parse(basket),
      {
        ...catalogData,
        score: "1",
      },
    ];

    await AsyncStorage.setItem("basket", JSON.stringify(result));
    setIsBasket(true);
    return;
  };

  const deleteBasketItem = async () => {
    const basket = await AsyncStorage.getItem("basket");
    if (!basket) return;
    if (JSON.parse(basket).length === 0) return;

    const newBasket = JSON.parse(basket).filter(
      (item) => item.id !== router.params.id
    );

    await AsyncStorage.setItem("basket", JSON.stringify(newBasket));
    setIsBasket(false);
  };

  useEffect(() => {
    AsyncStorage.getItem("basket").then((value) => {
      if (!value) return setIsBasket(false);
      if (JSON.parse(value).length === 0) return setIsBasket(false);

      const result = JSON.parse(value).find(
        (item) => item.id === router.params.id
      );
      if (!result) return setIsBasket(false);

      setIsBasket(true);
    });
  });
  return (
    <>
      <View style={styles.catalog}>
        <View style={styles.back}>
          <TouchableOpacity onPress={() => navigation.navigate("home")}>
            <BackCatalog />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
          <View style={normal.container}>
            <View style={styles.sliderContainer}>
              {Object.keys(catalogData).length !== 0 ? (
                <Swiper
                  activeDotStyle={styles.sliderActiveDot}
                  showsButtons={false}
                  paginationStyle={styles.sliderPagination}
                >
                  {catalogData.images.map((item, index) => {
                    return (
                      <Image
                        key={index}
                        source={{
                          uri: `${SERVER_ADMIN}/media/${item.catalog.filename}`,
                        }}
                        resizeMode="contain"
                        style={styles.sliderItem}
                      />
                    );
                  })}
                </Swiper>
              ) : (
                <></>
              )}
            </View>

            <View style={{ marginTop: 40 }}>
              <Text style={styles.catalogTitle}>{catalogData.name}</Text>
              <Text style={styles.catalogTitleSub}>{catalogData.span}</Text>
              <Text style={styles.catalogIndex}>
                Код товару: {catalogData.id}
              </Text>
              <View style={{ marginTop: 20 }}>
                <Text style={styles.catalogText}>
                  Розміри: {catalogData.size}(мм).
                </Text>
                <Text style={styles.catalogText}>
                  Вага: {catalogData.weight}кг. Навантаження: до{" "}
                  {catalogData.upload}кг.
                </Text>
                <Text style={styles.catalogText}>
                  {catalogData.description}
                </Text>
              </View>
            </View>
            {isBasket ? (
              <TouchableOpacity
                style={styles.basketGo(true)}
                onPress={() => deleteBasketItem()}
              >
                <ShopIcon />
                <Text style={styles.basketGoText}>В кошику</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.basketGo()}
                onPress={() => addBasketItem()}
              >
                <ShopIcon />
                <Text style={styles.basketGoText}>Додати в кошик</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
      <Navigation />
      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default CatalogItem;
