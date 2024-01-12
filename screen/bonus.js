import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import Navigation from "../components/Navigation";
import { StatusBar } from "react-native";
import styles from "../style/bonus";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import BackCatalog from "../assets/Icons/BackCatalog";
import BackgroundBonus from "../assets/images/backgroundBonus.png";
import { useEffect } from "react";
import useVerify from "../components/hook/useVerify";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const moment = require("moment");

const Bonus = ({ refresh = false }) => {
  const navigation = useNavigation();
  const isFocusedScreen = useIsFocused();

  const [bonusScore, setBonusScore] = useState("0");
  const [bonusLastDate, setBonusLastDate] = useState("");

  const [bonus, setBonus] = useState([
    {
      title: "Сертифікат MD Fashion",
      date: "01.05.2023",
      order: "",
      bonus: "-3500",
      bonusType: "minus",
      type: "default",
    },
    {
      title: "Реферальна програма",
      date: "24.03.2023",
      order: "200",
      bonus: "+100",
      bonusType: "plus",
      type: "referral",
    },
    {
      title: "Поставка",
      date: "24.03.2023",
      order: "200",
      bonus: "+100",
      bonusType: "plus",
      type: "delivery",
    },
  ]);

  const requestBonus = async () => {
    const result = await useVerify();

    if (result.verify) {
      setBonus([...result.dataFetch.bonus.bonusHistory].reverse());

      setBonusScore(result.dataFetch.bonus.bonusScore);
      if (result.dataFetch.bonus.startBonusDate !== "") {
        const dateString = result.dataFetch.bonus.startBonusDate;

        if (dateString === undefined) {
          return setBonusLastDate("");
        }
        const date = moment(dateString, "YYYY.MM.DD");

        const incrementedDate = date.add(12, "months");
        const formattedDate = incrementedDate.format("YYYY.MM.DD");
        setBonusLastDate(formattedDate);
      }
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

  useEffect(() => {
    if (isFocusedScreen) {
      requestBonus();
      getBasket();
    }
  }, [isFocusedScreen]);

  const goToNavigation = async (path) => {
    const { verify } = await useVerify();

    if (verify) {
      navigation.navigate(path, { prevScreen: "bonus" });
    } else {
      navigation.navigate("login", { prevScreen: path });
    }
  };
  return (
    <>
      <View style={{ paddingBottom: 200 }}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate("home")}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <BackCatalog />

            <Text style={styles.backText}>Бонуси</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.bonusScore}>
          <ImageBackground
            style={styles.bonusScoreBackground}
            source={BackgroundBonus}
          >
            <View style={styles.bonusScoreBackgroundBlock}>
              <Text style={styles.bonusScoreSum}>{bonusScore}</Text>
              <Text style={styles.bonusScoreSumText}>бонусів на рахунку</Text>
              <Text style={styles.bonusScoreSumWarning}>
                {bonusLastDate === ""
                  ? "Бонуси, які згорять у найближчі 12 місяців - відсутні"
                  : `Ваші бонуси згорять ${bonusLastDate}`}
              </Text>
            </View>
          </ImageBackground>
        </View>

        <ScrollView>
          <View style={styles.bonusHistory}>
            <TouchableOpacity
              style={{ ...styles.bonusHistoryItem(), alignItems: "center" }}
              onPress={() => {
                goToNavigation("profile/offer/referral");
              }}
            >
              <Text
                style={{
                  ...styles.bonusHistoryItemTitle("referral"),
                  color: "black",
                }}
              >
                Реферальна програма
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.bonusHistoryItem(), alignItems: "center" }}
              onPress={() => {
                goToNavigation("profile/partner");
              }}
            >
              <Text
                style={{ ...styles.bonusHistoryItemTitle(), color: "black" }}
              >
                Партнерська програма
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.bonusHistoryItem(), alignItems: "center" }}
              onPress={() => {
                goToNavigation("profile/offer/gift");
              }}
            >
              <Text
                style={{ ...styles.bonusHistoryItemTitle(), color: "black" }}
              >
                Подарунок колективу
              </Text>
            </TouchableOpacity>
            {bonus.map((item, index) => (
              <View style={styles.bonusHistoryItem(item.type)} key={index}>
                <View style={styles.bonusHistoryItemBlock}>
                  <Text style={styles.bonusHistoryItemTitle(item.type)}>
                    {item.title}
                  </Text>
                  <Text style={styles.bonusHistoryItemDate}>{item.date}</Text>
                </View>
                <View style={styles.bonusHistoryItemBlock}>
                  <Text style={styles.bonusHistoryItemOrder(item.type)}>
                    {item.order}
                  </Text>
                  <Text style={styles.bonusHistoryItemSum(item.bonusType)}>
                    {item.bonus}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <Navigation active="bonus" scoreBasket={basketScore} />
      <StatusBar barStyle="dark-content" />
    </>
  );
};
export default Bonus;
