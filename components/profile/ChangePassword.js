import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import styles from "../../style/profile/profile-data";
import CheckBoxIcon from "../../assets/Icons/CheckBoxIcon";
import { useState } from "react";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ChangePassword = ({ show = false, showFunc, changePassword }) => {
  const [isShowPass, setIsShowPass] = useState(false);

  const [passwordInput, setPasswordInput] = useState({
    currentPassword: "",
    newPassword: "",
    acceptPassword: "",
  });

  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [acceptPasswordError, setAcceptPasswordError] = useState(false);

  const checkPassword = async () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    const passwordsError = {
      currentPassword: false,
      newPassword: false,
      acceptPassword: false,
    };

    if (passwordInput.currentPassword === "") {
      setCurrentPasswordError(true);
      passwordsError.currentPassword = true;
    }
    if (!passwordRegex.test(passwordInput.newPassword)) {
      setNewPasswordError(true);
      passwordsError.newPassword = true;
    }

    if (passwordInput.newPassword !== passwordInput.acceptPassword) {
      setAcceptPasswordError(true);
      passwordsError.acceptPassword = true;
    }
    if (
      passwordsError.acceptPassword ||
      passwordsError.currentPassword ||
      passwordsError.newPassword
    ) {
      return;
    }

    const result = await changePassword(passwordInput);
    console.log(result);
    if (result.code === 401) {
      return setCurrentPasswordError(true);
    }
    setPasswordInput({
      newPassword: "",
      currentPassword: "",
      acceptPassword: "",
    });
    setIsShowPass(false);
    showFunc(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.backdrop(show)}>
      <View style={styles.modal}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Змінити пароль</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputPlaceholder}>
              Існуючий або тимчасовий пароль
            </Text>

            <TextInput
              style={styles.input(currentPasswordError)}
              secureTextEntry={!isShowPass}
              value={passwordInput.currentPassword}
              onChangeText={(value) =>
                setPasswordInput({ ...passwordInput, currentPassword: value })
              }
              onFocus={() => setCurrentPasswordError(false)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputPlaceholder}>Придумайте новий пароль</Text>
            <TextInput
              style={styles.input(newPasswordError)}
              secureTextEntry={!isShowPass}
              onChangeText={(value) =>
                setPasswordInput({ ...passwordInput, newPassword: value })
              }
              value={passwordInput.newPassword}
              onFocus={() => setNewPasswordError(false)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputPlaceholder}>Підтвердіть пароль</Text>
            <TextInput
              style={styles.input(acceptPasswordError)}
              secureTextEntry={!isShowPass}
              onChangeText={(value) =>
                setPasswordInput({ ...passwordInput, acceptPassword: value })
              }
              value={passwordInput.acceptPassword}
              onFocus={() => setAcceptPasswordError(false)}
            />
          </View>

          <TouchableOpacity
            style={styles.showPass}
            onPress={() => setIsShowPass(!isShowPass)}
          >
            {isShowPass ? (
              <CheckBoxIcon />
            ) : (
              <View style={styles.showPassBorder}></View>
            )}
            <Text style={styles.showPassText}>Показати пароль</Text>
          </TouchableOpacity>
          <Text style={styles.warning}>
            Пароль повинен бути не менше 6 символів, містити цифри, латинські
            літери, в тому числі і великі, і не повинен збігатися з ім’ям та
            ел.почтою
          </Text>
          <View style={styles.controls}>
            <TouchableOpacity
              onPress={() => {
                setIsShowPass(false);
                showFunc(false);
                Keyboard.dismiss();
              }}
              style={{ marginRight: 20 }}
            >
              <Text style={styles.controlsButtonText}>Відміна</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                checkPassword();
              }}
            >
              <Text style={styles.controlsButtonText}>Зберегти</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default ChangePassword;
