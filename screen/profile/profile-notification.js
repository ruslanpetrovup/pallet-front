import { View, Text, TouchableOpacity } from "react-native";
import Navigation from "../../components/Navigation";
import styles from "../../style/profile/profile-notification";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import BackCatalog from "../../assets/Icons/BackCatalog";
import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileNotification = () => {
  const navigation = useNavigation();
  const isFocusedScreen = useIsFocused();

  const [notificationChat, setNotificationChat] = useState(false);
  const [notificationSocial, setNotificationSocial] = useState(false);

  const requestNotification = async () => {
    const getNotification = await AsyncStorage.getItem("notification");
    if (getNotification === null || !getNotification) return;
    console.log(getNotification);
    const data = JSON.parse(getNotification);

    setNotificationChat(data.chat);
    setNotificationSocial(data.social);
  };

  const changeNotificationChat = async () => {
    await AsyncStorage.setItem(
      "notification",
      JSON.stringify({ chat: !notificationChat, social: notificationSocial })
    );
    setNotificationChat(!notificationChat);
  };

  const changeNotificationSocial = async () => {
    await AsyncStorage.setItem(
      "notification",
      JSON.stringify({ chat: notificationChat, social: !notificationSocial })
    );
    setNotificationSocial(!notificationSocial);
  };

  useEffect(() => {
    if (isFocusedScreen) {
      requestNotification();
    }
  }, [isFocusedScreen]);
  return (
    <>
      <View>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate("profile")}
        >
          <BackCatalog />
          <Text style={styles.backText}>Сповіщення</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={changeNotificationChat}
          style={styles.wrapper}
        >
          <View style={styles.wrapperText}>
            <Text style={styles.wrapperTextTitle}>
              Повідомлення про замовлення
            </Text>
            <Text style={styles.wrapperTextDesc}>
              Нагадування про замовлення і повідомлення в чаті
            </Text>
          </View>

          <View style={styles.buttonIs(notificationChat)}>
            <View style={styles.buttonIsView(notificationChat)}></View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={true}
          onPress={changeNotificationSocial}
          style={{ ...styles.wrapper, opacity: 0.5 }}
        >
          <View style={styles.wrapperText}>
            <Text style={styles.wrapperTextTitle}>Повідомлення чату</Text>
            <Text
              style={{
                ...styles.wrapperTextDesc,
                fontWeight: "400",
                color: "red",
              }}
            >
              Ще в розробці{" "}
            </Text>
          </View>

          <View style={styles.buttonIs(notificationSocial)}>
            <View style={styles.buttonIsView(notificationSocial)}></View>
          </View>
        </TouchableOpacity>
      </View>
      <Navigation active="profile" />
      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default ProfileNotification;
