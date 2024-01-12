import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
  Linking,
} from "react-native";
import styles from "../style/profile";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import profileIcon from "../assets/profileTest.png";
import ProfileIcons from "../assets/Icons/ProfileIcons.js";
import {
  useIsFocused,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useVerify from "../components/hook/useVerify";
import { ScrollView } from "react-native";
import ProfileImage from "../assets/Icons/ProfileImage";

const menuData = [
  {
    title: "Мої замовлення",
    image: "order",
    path: "profile/order",
    important: false,
    globalLink: false,
  },
  {
    title: "Сповіщення",
    image: "notification",
    path: "profile/notification",
    important: false,
    globalLink: false,
  },
  {
    title: "Партнерська програма",
    image: "partner",
    path: "profile/partner",
    important: false,
    globalLink: false,
  },
  {
    title: "Пропозиції від компанії",
    image: "offer",
    path: "profile/offer",
    important: false,
    globalLink: false,
  },
  {
    title: "Бонусний рахунок",
    image: "bonus",
    path: "bonus",
    important: false,
    globalLink: false,
  },
  {
    title: "Інформація",
    image: "info",
    path: "profile/info",
    important: false,
    globalLink: false,
  },
  {
    title: "Викуп віддонів",
    image: "deposit",
    path: "buyout",
    important: false,
    globalLink: false,
  },

  {
    title: "БОТ ПАЛЕТНИЙ ДВІР",
    image: "bot",
    path: "https://t.me/PalletDvir_bot",
    important: true,
    globalLink: true,
  },
];

const Profile = () => {
  const isFocusScreen = useIsFocused();
  const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation();
  const [data, setData] = useState({
    _id: "",
    birthday: "",
    delivery: {
      _id: "",
      city: "",
      house: "",
      index: "",
      region: "",
      street: "",
    },
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    phone: "",
  });

  const verifyFun = async () => {
    setRefresh(true);
    const { verify, dataFetch } = await useVerify();
    setRefresh(false);
    setData(dataFetch);
  };

  const [basketScore, setBasketScore] = useState(0);
  const getBasket = async () => {
    AsyncStorage.getItem("basket").then((value) => {
      if (!value) return;
      const result = JSON.parse(value);
      setBasketScore(result.length);
    });
  };

  useEffect(() => {
    verifyFun();

    if (isFocusScreen) {
      getBasket();
    }
  }, [isFocusScreen]);

  return (
    <>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 220 }}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={verifyFun} />
        }
      >
        <View style={styles.logo}>
          <Logo />
        </View>
        <TouchableOpacity
          style={styles.info}
          onPress={() => {
            navigation.navigate("profile/data");
          }}
        >
          <View style={styles.infoImg}>
            <ProfileImage />
          </View>
          {/* <Image style={styles.infoImg} source={profileIcon} /> */}
          <Text style={styles.infoTitle}>
            {data.lastName !== "" ? data.lastName : ""}{" "}
            {data.firstName !== "" ? data.firstName : ""}
          </Text>
        </TouchableOpacity>

        <View style={styles.menu}>
          {menuData.map((item, index) => {
            if (item.globalLink) {
              return (
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.menuItem}
                  key={index}
                  onPress={() => {
                    Linking.openURL(item.path);
                  }}
                >
                  <View style={styles.menuItemImg}>
                    <ProfileIcons name={item.image} />
                  </View>
                  <Text
                    style={
                      item.important
                        ? styles.menuItemTextImportant
                        : styles.menuItemText
                    }
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.menuItem}
                  key={index}
                  onPress={() => {
                    navigation.navigate(item.path);
                  }}
                >
                  <View style={styles.menuItemImg}>
                    <ProfileIcons name={item.image} />
                  </View>
                  <Text
                    style={
                      item.important
                        ? styles.menuItemTextImportant
                        : styles.menuItemText
                    }
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            }
          })}
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.menuItem}
            onPress={async () => {
              await AsyncStorage.setItem("token", "");
              navigation.navigate("home");
            }}
          >
            <View style={styles.menuItemImg}>
              <ProfileIcons name="logout" />
            </View>
            <Text style={styles.menuItemText}>Вийти із акаунта</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Navigation active="profile" scoreBasket={basketScore} />
      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default Profile;
