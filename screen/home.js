import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  RefreshControl,
  Animated,
} from "react-native";
import Logo from "../components/Logo";
import Swiper from "react-native-swiper";
import { useEffect, useMemo, useState } from "react";
import CatalogPlus from "../assets/Icons/CatalogPlus";
import Navigation from "../components/Navigation";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "../style/homeStyle";
import slide1 from "../assets/images/slider/slide-1.jpg";
import slide2 from "../assets/images/slider/slide-2.jpg";
import slide3 from "../assets/images/slider/slide-3.jpg";
import slide4 from "../assets/images/slider/slide-4.jpg";
import bonus from "../assets/images/slider/bonusScore.png";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { SERVER_ADMIN } from "@env";
import useVerify from "../components/hook/useVerify";
import { Circle } from "react-native-progress";
import useSaveScreen from "../components/hook/useSaveScreen";
import NoInternet from "../components/NoInternet";

const slideData = [
  {
    id: "1",
    image: slide1,
    bonus: true,
    path: async () => {
      return "bonus";
    },
  },
  {
    id: "2",
    image: slide2,
    bonus: false,
    path: async () => {
      const verify = await useVerify();
      if (verify.verify) {
        return "profile/offer/certificate";
      } else {
        return "login";
      }
    },
  },
  {
    id: "3",
    image: slide3,
    bonus: false,
    path: async () => {
      const verify = await useVerify();
      if (verify.verify) {
        return "profile/offer/referral";
      } else {
        return "login";
      }
    },
  },
  {
    id: "4",
    image: slide4,
    bonus: false,
    path: async () => {
      const verify = await useVerify();
      if (verify.verify) {
        return "profile/offer/gift";
      } else {
        return "login";
      }
    },
  },
];

const Home = () => {
  const [testTab, setTestTab] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [bonusScore, setBonusScore] = useState("");
  const isFocusedScreen = useIsFocused();

  const getBonus = async () => {
    const request = await useVerify();
    if (request.verify) {
      if (request.dataFetch.bonus.bonusScore !== "0") {
        setBonusScore(request.dataFetch.bonus.bonusScore);
      } else {
        setBonusScore("");
      }
    } else {
      setBonusScore("");
    }
  };

  const [basketScore, setBasketScore] = useState(0);
  const getBasket = async () => {
    AsyncStorage.getItem("basket").then((value) => {
      if (!value) return;
      const result = JSON.parse(value);
      setBasketScore(result.length);
    });
  };

  const [catalogData, setCatalogData] = useState([]);

  const router = useNavigation();

  const addBasketItem = async (id) => {
    const findCatalog = catalogData.find((item) => item.id === id);
    if (!findCatalog) return;

    const requestBasket = await AsyncStorage.getItem("basket");

    if (!requestBasket || JSON.parse(requestBasket).length === 0) {
      await AsyncStorage.setItem(
        "basket",
        JSON.stringify([{ ...findCatalog, score: "1" }])
      );
      getBasket();
      return;
    }

    const basket = JSON.parse(requestBasket);
    const basketCurrent = basket.find((item) => item.id === id);

    if (!basketCurrent) {
      await AsyncStorage.setItem(
        "basket",
        JSON.stringify([...basket, { ...findCatalog, score: "1" }])
      );
      getBasket();
      return;
    } else {
      await AsyncStorage.setItem(
        "basket",
        JSON.stringify([
          ...basket.filter((item) => item.id !== basketCurrent.id),
          { ...basketCurrent, score: String(Number(basketCurrent.score) + 1) },
        ])
      );
      getBasket();
      return;
    }
  };

  const requestCatalog = async () => {
    try {
      const requestCategories = await axios(
        `${SERVER_ADMIN}/api/categories-products`
      );
      console.log(SERVER_ADMIN);
      const getCatalog = await axios.get(
        `${SERVER_ADMIN}/api/products?limit=0`
      );
      const responseCatalog = [];

      requestCategories.data.docs.forEach((item) => {
        getCatalog.data.docs.forEach((product) => {
          if (product.categories.name === item.name) {
            responseCatalog.push(product);
          }
        });
      });

      responseCatalog.sort((a, b) => {
        return Number(a.customId) - Number(b.customId);
      });

      setCatalogData(responseCatalog);
    } catch (err) {
      console.log(err);
    }
  };

  const requestSortButtons = async () => {
    const requestCategories = await axios(
      `${SERVER_ADMIN}/api/categories-products`
    );

    const result = requestCategories.data.docs.map((item) => {
      return {
        text: item.name,
        active: false,
      };
    });

    setSortButtons([{ text: "Всі", active: true }, ...result]);
  };

  const verifyFun = async (path) => {
    const { verify, dataFetch } = await useVerify();

    if (verify) {
      return router.navigate(path);
    } else {
      return router.navigate("login", { prevScreen: path });
    }
  };

  useEffect(() => {
    useSaveScreen(router.getState().routes[0].name);

    if (isFocusedScreen) {
      getBasket();
      requestCatalog();
      requestSortButtons();
      getBonus();
    }
  }, [isFocusedScreen]);

  const [sortInput, setSortInput] = useState("Всі");
  const sortDataChange = useMemo(() => {
    if (sortInput === "Всі") return [];
    const result = catalogData.filter(
      (item) => item.categories.name === sortInput
    );

    result.sort((a, b) => {
      return Number(a.customId) - Number(b.customId);
    });

    return result;
  }, [sortInput]);

  const [sortButtons, setSortButtons] = useState([
    { text: "Всі", active: true },
  ]);

  const sortFunc = (value) => {
    const changeSort = sortButtons.map((item) => {
      if (item.text === value) {
        return {
          text: item.text,
          active: true,
        };
      } else {
        return {
          text: item.text,
          active: false,
        };
      }
    });
    setSortButtons(changeSort);
    setSortInput(value);
  };

  const refreshRequest = async () => {
    setRefresh(true);
    await requestCatalog();
    await requestSortButtons();
    await getBasket();
    await getBonus();
    setRefresh(false);
  };

  return (
    <>
      <View style={styles.home}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              colors={["#ff0000"]}
              onRefresh={refreshRequest}
              tintColor={"white"}
            />
          }
        >
          <Logo color="white" />
          <View style={styles.banner}>
            <Swiper
              showsButtons={false}
              paginationStyle={styles.bannerPagination}
              activeDotStyle={styles.bannerActiveDot}
              dotStyle={styles.bannerDot}
              autoplay
            >
              {slideData.map((item) => {
                if (item.bonus && bonusScore !== "") {
                  return (
                    <TouchableOpacity
                      onPress={async () => {
                        const path = await item.path();
                        router.navigate(path);
                      }}
                      style={styles.bannerItem}
                      key={item.id}
                    >
                      <View style={styles.bannerFirstBonus}>
                        <ImageBackground
                          source={item.image}
                          style={{ width: "100%", height: "100%" }}
                        ></ImageBackground>
                      </View>
                      <View style={styles.bannerLast}>
                        <ImageBackground
                          source={bonus}
                          style={{
                            width: "100%",
                            height: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text style={styles.bannerLastScore}>
                            {bonusScore} бонусов
                          </Text>
                          <Text style={styles.bannerLastScoreText}>
                            на рахунку
                          </Text>
                        </ImageBackground>
                      </View>
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <TouchableOpacity
                      onPress={async () => {
                        const path = await item.path();
                        router.navigate(path);
                      }}
                      style={styles.bannerItem}
                      key={item.id}
                    >
                      <View style={styles.bannerFirst}>
                        <ImageBackground
                          source={item.image}
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                          resizeMode="stretch"
                        ></ImageBackground>
                      </View>
                    </TouchableOpacity>
                  );
                }
              })}
            </Swiper>
          </View>

          <View>
            <View style={styles.tabs}>
              <TouchableOpacity
                style={styles.tabsItem(testTab)}
                onPress={() => setTestTab(true)}
              >
                <Text style={styles.tabsText}>Поставка палет</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.tabsItem(!testTab)}
                onPress={() => {
                  verifyFun("buyout");
                }}
              >
                <Text style={styles.tabsText}>Викуп піддонів</Text>
              </TouchableOpacity>
              <View style={styles.tabsBorder(testTab)}></View>
            </View>

            <View style={styles.sortButton}>
              <FlatList
                style={styles.sortButtonList}
                data={sortButtons}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.sortButtonItem(item.active)}
                    onPress={() => sortFunc(item.text)}
                  >
                    <Text style={styles.sortButtonItemText(item.active)}>
                      {item.text}
                    </Text>
                  </TouchableOpacity>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>

          <View style={styles.catalogContainer}>
            {catalogData.length === 0 ? (
              <Circle
                size={50}
                indeterminate={true}
                color={"black"}
                style={{ alignItems: "center" }}
              />
            ) : (
              <>
                {sortDataChange.length === 0 ? (
                  <>
                    {catalogData.map((item) => (
                      <TouchableOpacity
                        onPress={() =>
                          router.navigate("catalog-item", { id: item.id })
                        }
                        key={item.id}
                        style={styles.catalogItem}
                      >
                        <View style={styles.catalogImage}>
                          <Image
                            source={{
                              uri: `${SERVER_ADMIN}/media/${item.images[0].catalog.filename}`,
                            }}
                            style={styles.catalogImg}
                            resizeMode="center"
                          />
                        </View>
                        <View style={styles.catalogContent}>
                          <Text style={styles.catalogTitle}>{item.name}</Text>
                          <Text style={styles.catalogDesc}>
                            Розміри: {item.size}(мм).
                          </Text>
                          <Text style={styles.catalogDesc}>
                            Навантаження: до {item.upload}кг.
                          </Text>

                          <TouchableOpacity
                            onPress={() => addBasketItem(item.id)}
                            style={styles.catalogBasket}
                          >
                            <CatalogPlus />
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </>
                ) : (
                  <>
                    {sortDataChange.map((item) => (
                      <TouchableOpacity
                        onPress={() =>
                          router.navigate("catalog-item", { id: item.id })
                        }
                        key={item.id}
                        style={styles.catalogItem}
                      >
                        <View style={styles.catalogImage}>
                          <Image
                            source={{
                              uri: `${SERVER_ADMIN}/media/${item.images[0].catalog.filename}`,
                            }}
                            style={styles.catalogImg}
                            resizeMode="center"
                          />
                        </View>
                        <View style={styles.catalogContent}>
                          <Text style={styles.catalogTitle}>{item.name}</Text>
                          <Text style={styles.catalogDesc}>
                            Розміри: {item.size}(мм).
                          </Text>
                          <Text style={styles.catalogDesc}>
                            Навантаження: до {item.upload}кг.
                          </Text>

                          <TouchableOpacity
                            onPress={() => addBasketItem(item.id)}
                            style={styles.catalogBasket}
                          >
                            <CatalogPlus />
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </>
                )}
              </>
            )}
          </View>
        </ScrollView>
      </View>

      <Navigation active="home" scoreBasket={basketScore} />
      <NoInternet requestFunction={refreshRequest} />
      <StatusBar style="light" />
    </>
  );
};

export default Home;
