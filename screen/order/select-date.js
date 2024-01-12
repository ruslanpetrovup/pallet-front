import { View, Text, TouchableOpacity, StatusBar, Button } from "react-native";
import styles from "../../style/order";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import BackCatalog from "../../assets/Icons/BackCatalog";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { SERVER } from "@env";
import { Calendar, LocaleConfig } from "react-native-calendars";
import useVerify from "../../components/hook/useVerify";
import axios from "axios";
import moment from "moment";
import "moment/locale/uk";

const OrderSelectDate = () => {
  const isFocusedAccept = useIsFocused();
  const navigation = useNavigation();

  const getCurrentDate = (format = false) => {
    var currentDate = new Date();

    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();

    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }
    if (format) {
      return year + "-" + month + "-" + day;
    }

    var formattedDate = year + "." + month + "." + day;

    return formattedDate;
  };

  const [currentDate, setCurrentDate] = useState(getCurrentDate(true));

  const handleDayPress = (day) => {
    // console.log("Выбранная дата:", day);
    setCurrentDate(day.dateString);
  };

  LocaleConfig.locales["uk"] = {
    monthNames: [
      "Січень",
      "Лютий",
      "Березень",
      "Квітень",
      "Травень",
      "Червень",
      "Липень",
      "Серпень",
      "Вересень",
      "Жовтень",
      "Листопад",
      "Грудень",
    ],

    dayNames: [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ],
    dayNamesShort: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  };

  LocaleConfig.defaultLocale = "uk";

  const formatDate = (dateString) => {
    const date = moment(dateString).locale("uk");
    console.log(date.format("YYYY.MM.DD"));
    return date.format("YYYY.MM.DD");
  };

  function generateNumber() {
    var number = "";

    for (var i = 0; i < 9; i++) {
      number += Math.floor(Math.random() * 10);
    }

    return String(number);
  }

  const responseOrder = async () => {
    const fetchOrderData = await AsyncStorage.getItem("orderData");
    const fetchOrderDataJSON = JSON.parse(fetchOrderData);

    const result = await axios.post(`${SERVER}/auth/create/order`, {
      ...fetchOrderDataJSON,
      againData: fetchOrderDataJSON,
    });

    console.log(result.data);

    let bonusSum = 0;

    fetchOrderDataJSON.products.forEach((item) => {
      bonusSum += Number(item.score);
    });

    await axios.post(`${SERVER}/auth/bonus/order`, {
      id: fetchOrderDataJSON.id,
      idUser: fetchOrderDataJSON.idUser,
      title: "Замовлення",
      date: fetchOrderDataJSON.dateCreate,
      order: String(bonusSum),
      bonus: `+${bonusSum * 1}`,
      bonusType: "plus",
      type: "order",
    });
  };

  const updateOrder = async (payment) => {
    const getOrder = await AsyncStorage.getItem("orderData");
    const generateId = generateNumber();
    const user = await useVerify();

    await AsyncStorage.setItem(
      "orderData",
      JSON.stringify({
        ...JSON.parse(getOrder),
        dateSend: currentDate, //  Дата доставки
        id: generateId, // Ид заказа
        idUser: user.dataFetch._id,
        statusOrder: "В процесі оброблення",
        dateCreate: getCurrentDate(),
      })
    );
    await responseOrder();
    navigation.navigate("order/finally");
  };

  return (
    <>
      <View>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate("order/select-payment")}
        >
          <View style={{ flexDirection: "row" }}>
            <BackCatalog />

            <Text style={styles.backText}>Дата постачання </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.dateCurrent}>
          <Text style={styles.dateCurrentText}>{formatDate(currentDate)}</Text>
        </View>

        <Calendar
          theme={{
            borderColor: "rgba(244, 0, 0, 0.74)",
            borderWidth: 1,
            backgroundColor: "#ffffff",
          }}
          onDayPress={handleDayPress}
          minDate={getCurrentDate(true)}
          markedDates={{
            [currentDate]: {
              selected: true,
              customStyles: {
                container: {
                  borderColor: "rgba(244, 0, 0, 0.74)",
                  borderWidth: 1,
                  backgroundColor: "#ffffff",
                },
              },
              customContainerStyle: {
                borderColor: "rgba(244, 0, 0, 0.74)",
                borderWidth: 1,
                backgroundColor: "#ffffff",
                width: 100,
                height: 100,
              },
            },
          }}
        />

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

export default OrderSelectDate;
