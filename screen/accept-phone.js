import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  StatusBar,
  Animated,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import styles from "../style/register";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER } from "@env";
import BackCatalog from "../assets/Icons/BackCatalog";

import Toast, { ErrorToast } from "react-native-toast-message";

const AcceptPhone = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const textInputRefs = useRef([]);

  const [acceptPhoneOne, setAcceptPhoneOne] = useState("");
  const [acceptPhoneTwo, setAcceptPhoneTwo] = useState("");
  const [acceptPhoneThree, setAcceptPhoneThree] = useState("");
  const [acceptPhoneFour, setAcceptPhoneFour] = useState("");
  const [acceptPhoneError, setAcceptPhoneError] = useState(false);

  const handleTextChange = (index, text) => {
    if (text.length === 1) {
      // Перемещение фокуса на следующий TextInput
      if (index < textInputRefs.current.length - 1) {
        textInputRefs.current[index + 1].focus();
      }
    } else if (text.length === 0) {
      // Перемещение фокуса на предыдущий TextInput
      if (index > 0) {
        textInputRefs.current[index - 1].focus();
      }
    }
  };

  const requestAccept = async () => {
    closeKeyboard();
    const acceptPhoneData = await AsyncStorage.getItem("accept-phone-data");
    const acceptPhoneDataJSON = JSON.parse(acceptPhoneData);

    if (
      acceptPhoneOne === "" ||
      acceptPhoneTwo === "" ||
      acceptPhoneThree === "" ||
      acceptPhoneFour === ""
    )
      return setAcceptPhoneError(true);

    const code =
      acceptPhoneOne + acceptPhoneTwo + acceptPhoneThree + acceptPhoneFour;
    const result = await axios.post(`${SERVER}/auth/accept-phone`, {
      phone: acceptPhoneDataJSON.phone,
      code: code,
    });

    if (result.data.status === "code incorrect") {
      return setAcceptPhoneError(true);
    }

    if (result.data.status !== "active") return;

    const token = await axios.post(`${SERVER}/auth/login`, {
      login: acceptPhoneDataJSON.login,
      password: acceptPhoneDataJSON.password,
    });

    await AsyncStorage.setItem("token", token.data.token);

    if (
      acceptPhoneDataJSON.prevScreen !== undefined &&
      acceptPhoneDataJSON.prevScreen !== ""
    ) {
      return navigation.navigate(acceptPhoneDataJSON.prevScreen);
    }

    navigation.navigate("profile");
  };

  const onlyNumber = (number) => {
    const newNumber = number.replace(/\D/g, "");

    return newNumber;
  };

  const [animatedValue] = useState(new Animated.Value(150));
  const [valueAnimated, setValueAnimated] = useState(150);

  const startAnimation = () => {
    if (valueAnimated === 0) {
      setValueAnimated(150);
      Animated.timing(animatedValue, {
        toValue: 150,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      setValueAnimated(0);
      Animated.spring(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  };

  const againRequestCode = async () => {
    const acceptPhoneData = await AsyncStorage.getItem("accept-phone-data");
    const acceptPhoneDataJSON = JSON.parse(acceptPhoneData);
    setValueAnimated(150);
    Animated.timing(animatedValue, {
      toValue: 150,
      duration: 500,
      useNativeDriver: true,
    }).start();

    await axios.post(`${SERVER}/auth/send-code`, {
      phone: acceptPhoneDataJSON.phone,
    });

    Toast.show({
      type: "info",
      text1: "Успіх",
      text2: "На ваш номер було надіслано код",
      autoHide: false,
      onPress: () => Toast.hide(),
    });
  };

  const closeKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <>
      <View style={styles.register}>
        <TouchableOpacity
          style={styles.acceptBack}
          onPress={() => navigation.navigate("register")}
        >
          <BackCatalog />
          <Text style={styles.acceptBackText}>Назад до реєстрації</Text>
        </TouchableOpacity>
        <KeyboardAwareScrollView>
          <View style={styles.formContainer}>
            <Text style={styles.acceptTitle}>Введіть код із смс</Text>
            <View style={styles.acceptPhoneWrapper}>
              <TextInput
                onChangeText={(value) => {
                  setAcceptPhoneOne(value[0]);
                  setAcceptPhoneTwo(value[1]);
                  setAcceptPhoneThree(value[2]);
                  setAcceptPhoneFour(value[3]);
                }}
                style={{
                  opacity: 0,
                  width: 0,
                  height: 0,
                  position: "absolute",
                }}
              />
              <TextInput
                ref={(input) => {
                  textInputRefs.current[0] = input;
                }}
                style={styles.acceptPhoneInput(acceptPhoneError)}
                keyboardType="number-pad"
                value={acceptPhoneOne}
                onChangeText={(value) => {
                  const newValue = onlyNumber(value);
                  handleTextChange(0, newValue);
                  setAcceptPhoneOne(newValue);
                }}
                onFocus={() => {
                  setAcceptPhoneError(false);
                }}
                maxLength={1}
              />
              <TextInput
                ref={(input) => {
                  textInputRefs.current[1] = input;
                }}
                style={styles.acceptPhoneInput(acceptPhoneError)}
                keyboardType="numeric"
                value={acceptPhoneTwo}
                onChangeText={(value) => {
                  const newValue = onlyNumber(value);
                  handleTextChange(1, newValue);
                  setAcceptPhoneTwo(newValue);
                }}
                onFocus={() => {
                  setAcceptPhoneError(false);
                }}
                maxLength={1}
              />
              <TextInput
                ref={(input) => {
                  textInputRefs.current[2] = input;
                }}
                style={styles.acceptPhoneInput(acceptPhoneError)}
                keyboardType="numeric"
                value={acceptPhoneThree}
                onSubmitEditing={() => Keyboard.dismiss()}
                onChangeText={(value) => {
                  const newValue = onlyNumber(value);
                  handleTextChange(2, newValue);
                  setAcceptPhoneThree(newValue);
                }}
                onFocus={() => {
                  setAcceptPhoneError(false);
                }}
              />
              <TextInput
                ref={(input) => {
                  textInputRefs.current[3] = input;
                }}
                style={styles.acceptPhoneInput(acceptPhoneError)}
                keyboardType="numeric"
                value={acceptPhoneFour}
                onChangeText={(value) => {
                  const newValue = onlyNumber(value);
                  handleTextChange(3, newValue);
                  setAcceptPhoneFour(newValue);
                }}
                onFocus={() => {
                  setAcceptPhoneError(false);
                }}
                maxLength={1}
              />
            </View>

            <TouchableOpacity style={styles.submit} onPress={requestAccept}>
              <Text style={styles.submitText}>Підтвердити</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.acceptAgainCode}
              onPress={startAnimation}
            >
              <Text style={styles.acceptAgainCodeText}>Код не прийшов?</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>

      <Animated.View style={styles.acceptAgainCodeModal(animatedValue)}>
        <View style={styles.acceptAgainCodeWrapper}>
          <TouchableOpacity
            style={styles.acceptAgainCodeButton}
            onPress={againRequestCode}
          >
            <Text style={styles.acceptAgainCodeButtonText}>
              Надіслати ще раз код
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <StatusBar barStyle="dark-content" />
      <Toast />
    </>
  );
};

export default AcceptPhone;
