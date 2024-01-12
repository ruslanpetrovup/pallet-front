import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  StatusBar,
} from "react-native";
import axios from "axios";
import styles from "../style/register";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER } from "@env";

const Login = () => {
  const [loginButtons, setLoginButtons] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const loginRequest = async (login, password) => {
    try {
      const result = await axios.post(`${SERVER}/auth/login`, {
        login,
        password,
      });

      let prevScreenPath = "";
      if (route.params !== undefined) {
        if (
          route.params.prevScreen !== undefined &&
          route.params.prevScreen !== ""
        ) {
          prevScreenPath = route.params.prevScreen;
        }
      }

      if (result.data.status === "not active") {
        await AsyncStorage.setItem(
          "accept-phone-data",
          JSON.stringify({
            login: login,
            phone: result.data.phone,
            password: password,
            prevScreen: prevScreenPath,
          })
        );

        return navigation.navigate("accept-phone");
      }

      if (result.data.status === "ok") {
        // console.log(result.data);
        setLogin("");
        setPassword("");

        await AsyncStorage.setItem("token", result.data.token);
        if (route.params !== undefined) {
          if (
            route.params.prevScreen !== undefined ||
            route.params.prevScreen !== ""
          ) {
            return navigation.navigate(route.params.prevScreen);
          }
        }
        navigation.navigate("profile");
      } else {
        setLoginError(true);
        setPasswordError(true);
        setMessageError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const validNumber = () => {
    const isValid = /^(0|\+?380)9\d{8}$/.test(login);
    if (isValid) {
      if (login.length === 10) {
        return `+38${login}`;
      } else if (login.length === 12) {
        return `+${login}`;
      }

      setLoginError(false);
    } else {
      setLoginError(true);
      return "error";
    }
  };

  const midRequest = async () => {
    if (login === "") {
      setLoginError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }
    if (!login || !password) return;
    if (!login.includes("@")) {
      const phone = validNumber();
      if (phone === "error") return;
      loginRequest(phone, password);
    } else {
      loginRequest(login, password);
    }
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

        <View style={styles.formContainer}>
          <View style={styles.formWrapper}>
            <Text style={styles.placeholder}>Телефон або електронна почта</Text>
            <TextInput
              style={styles.input(loginError)}
              keyboardType="email-address"
              value={login}
              onChangeText={(value) => setLogin(value)}
              onFocus={() => {
                setLoginError(false);
              }}
            />
          </View>
          <View style={styles.formWrapper}>
            <Text style={styles.placeholder}>Пароль</Text>
            <TextInput
              style={styles.input(passwordError)}
              secureTextEntry
              value={password}
              onChangeText={(value) => setPassword(value)}
              onFocus={() => {
                setPasswordError(false);
                setMessageError(false);
              }}
            />
            {messageError ? (
              <Text style={styles.formErrorMessage}>
                Не правильний логін або пароль
              </Text>
            ) : (
              <></>
            )}
          </View>

          <TouchableOpacity style={styles.submit} onPress={midRequest}>
            <Text style={styles.submitText}>Увійти</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("reset-password")}
          >
            <Text style={styles.changePasswordText}>Забув пароль?</Text>
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default Login;
