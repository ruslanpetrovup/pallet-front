import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../style/register";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER } from "@env";

const Register = () => {
  const [loginButtons, setLoginButtons] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorPhoneSuch, setErrorPhoneSuch] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailSuch, setErrorEmailSuch] = useState(false);
  const [errorPassord, setErrorPassword] = useState(false);

  const [testPhone, setTestPhone] = useState(false);

  const validNumber = () => {
    console.log(phone);
    const isValid = /^(0|\+?380)[976]\d{8}$/.test(phone);
    if (isValid) {
      if (phone.length === 10) {
        console.log("suka");
        setPhone(`+38${phone}`);
      } else if (phone.length === 12) {
        setPhone(`+${phone}`);
      }
      setTestPhone(true);
    } else {
      setTestPhone(false);
    }
  };

  useEffect(() => {
    validNumber();
  }, [phone]);

  const registerRequest = async () => {
    if (firstName === "") {
      setErrorFirstName(true);
    }
    if (lastName === "") {
      setErrorLastName(true);
    }
    if (phone === "") {
      setErrorPhone(true);
    }
    if (!testPhone) {
      setErrorPhone(true);
    }
    if (email === "") {
      setErrorEmail(true);
    }
    if (password === "") {
      setErrorPassword(true);
    }

    if (
      firstName === "" ||
      lastName === "" ||
      phone === "" ||
      email === "" ||
      !testPhone
    ) {
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passwordRegex.test(password)) {
      return setErrorPassword(true);
    }

    console.log(SERVER);
    const result = await axios.post(`${SERVER}/auth/register`, {
      firstName,
      lastName,
      phone,
      email,
      password,
    });

    if (result.data.code === 409) {
      if (result.data.error === "email") {
        setErrorEmail(true);
        setErrorEmailSuch(true);
        return;
      }
      if (result.data.error === "phone") {
        setErrorPhone(true);
        setErrorPhoneSuch(true);
        return;
      }
    }
    if (result.data.status !== "ok") {
      console.log(result.data);
      return;
    }

    let prevScreenPath = "";
    if (route.params !== undefined) {
      if (
        route.params.prevScreen !== undefined &&
        route.params.prevScreen !== ""
      ) {
        prevScreenPath = route.params.prevScreen;
      }
    }

    await AsyncStorage.setItem(
      "accept-phone-data",
      JSON.stringify({
        login: email,
        phone: phone,
        password: password,
        prevScreen: prevScreenPath,
      })
    );

    navigation.navigate("accept-phone");

    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <View style={styles.register}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Авторизація</Text>
        </View>

        <View
          onLayout={(target) => {
            setLoginButtons(target.nativeEvent.layout.width);
          }}
          style={styles.buttons}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (route.params !== undefined) {
                if (
                  route.params.prevScreen !== undefined ||
                  route.params.prevScreen !== ""
                ) {
                  return navigation.navigate("login", {
                    prevScreen: route.params.prevScreen,
                  });
                }
              }
              navigation.navigate("login");
            }}
          >
            <Text style={styles.buttonText}>Вхід</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonActive(loginButtons)}
            onPress={() => {
              if (route.params !== undefined) {
                if (
                  route.params.prevScreen !== undefined ||
                  route.params.prevScreen !== ""
                ) {
                  return navigation.navigate("register", {
                    prevScreen: route.params.prevScreen,
                  });
                }
              }
              navigation.navigate("register");
            }}
          >
            <Text style={styles.buttonTextActive}>Реєстрація</Text>
          </TouchableOpacity>
        </View>
        <KeyboardAwareScrollView>
          <View style={styles.form}>
            <View style={styles.formContainer}>
              <View style={styles.formWrapper}>
                <Text style={styles.placeholder}>Ваше ім’я</Text>
                <TextInput
                  style={styles.input(errorFirstName)}
                  value={firstName}
                  onChangeText={(value) => setFirstName(value)}
                  onFocus={() => setErrorFirstName(false)}
                  placeholder="Іван"
                />
              </View>
              <View style={styles.formWrapper}>
                <Text style={styles.placeholder}>Прізвище</Text>
                <TextInput
                  style={styles.input(errorLastName)}
                  value={lastName}
                  onChangeText={(value) => setLastName(value)}
                  onFocus={() => setErrorLastName(false)}
                  placeholder="Іванов"
                />
              </View>
              <View style={styles.formWrapper}>
                <Text style={styles.placeholder}>Телефон</Text>
                <TextInput
                  style={styles.input(errorPhone)}
                  value={phone}
                  keyboardType="number-pad"
                  onChangeText={(value) => setPhone(value)}
                  onFocus={() => {
                    setErrorPhone(false);
                    setErrorPhoneSuch(false);
                  }}
                  placeholder="380931234455"
                />
                {errorPhoneSuch ? (
                  <Text style={styles.textError}>Цей номер зареєстровано</Text>
                ) : (
                  <></>
                )}
              </View>
              <View style={styles.formWrapper}>
                <Text style={styles.placeholder}>Ел. почта</Text>
                <TextInput
                  style={styles.input(errorEmail)}
                  value={email}
                  keyboardType="email-address"
                  onChangeText={(value) => setEmail(value)}
                  onFocus={() => {
                    setErrorEmail(false);
                    setErrorEmailSuch(false);
                  }}
                  placeholder="name@gmail.com"
                />

                {errorEmailSuch ? (
                  <Text style={styles.textError}>Ця пошта зареєстрована</Text>
                ) : (
                  <></>
                )}
              </View>

              <View style={styles.formWrapper}>
                <Text style={styles.placeholder}>Пароль</Text>
                <TextInput
                  textContentType="password"
                  style={styles.input(errorPassord)}
                  value={password}
                  secureTextEntry
                  onChangeText={(value) => setPassword(value)}
                  onFocus={() => setErrorPassword(false)}
                />
              </View>

              <Text style={styles.inputWarning}>
                Пароль повинен бути не менше 6 символів, містити цифри,
                латинські літери, в тому числі і великі, і не повинен збігатися
                з ім’ям та ел.почтою
              </Text>

              <TouchableOpacity style={styles.submit} onPress={registerRequest}>
                <Text style={styles.submitText}>Зареєструватися</Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 30 }}>
              <Text style={styles.text}>Реєструючись ви погоджуєтесь з</Text>
              <Text style={styles.linkText}>
                положенням про обробку і захист персональних даних та угодою
                користувача
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>

      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default Register;
