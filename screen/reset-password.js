import { useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity, TextInput, Text } from "react-native";
import styles from "../style/register";
import BackCatalog from "../assets/Icons/BackCatalog";
import { useState } from "react";
import validatePhone from "../constants/validatePhone";
import axios from "axios";
import { SERVER } from "@env";
import Toast, { ErrorToast } from "react-native-toast-message";

const toastConfig = {
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 15,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
};

const ResetPassword = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const validNumber = () => {
    const isValid = validatePhone.test(phone);
    if (isValid) {
      if (phone.length === 10) {
        return `+38${phone}`;
      } else if (phone.length === 12) {
        return `+${phone}`;
      }

      setPhoneError(false);
      return false;
    } else {
      setPhoneError(true);
      return true;
    }
  };

  const requestReset = async () => {
    if (!validNumber()) return;

    const resetPasswordRequest = await axios.post(
      `${SERVER}/auth/reset/password`,
      {
        phone: validNumber(),
      }
    );
    if (resetPasswordRequest.data.code === 404) {
      return setMessageError(true);
    }

    if (resetPasswordRequest.data.code === 200) {
      console.log("ok");
      Toast.show({
        type: "info",
        text1: "Успіх",
        text2: "На ваш номер було надіслано пароль",
        autoHide: false,
        onPress: () => Toast.hide(),
      });

      setTimeout(() => {
        navigation.navigate("login");
      }, 1500);
    }
  };

  return (
    <>
      <View>
        <TouchableOpacity
          style={styles.back}
          onPress={() => {
            navigation.navigate("login");
          }}
        >
          <BackCatalog />
          <Text style={styles.backText}>Скидання пароля</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 30, paddingHorizontal: 8 }}>
          <View style={styles.formWrapper}>
            <Text style={styles.placeholder}>Ваш номер телефону</Text>
            <TextInput
              style={styles.input(phoneError)}
              value={phone}
              onChangeText={(value) => setPhone(value)}
              onFocus={() => {
                setPhoneError(false);
                setMessageError(false);
              }}
            />
            {messageError ? (
              <Text style={styles.formErrorMessage}>
                Такий номер не зареєстрований
              </Text>
            ) : (
              <></>
            )}
          </View>

          <TouchableOpacity style={styles.submit} onPress={requestReset}>
            <Text style={styles.submitText}>Скинути пароль</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </>
  );
};

export default ResetPassword;
