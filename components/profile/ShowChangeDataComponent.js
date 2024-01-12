import { View, Text, TouchableOpacity, TextInput } from "react-native";
import axios from "axios";
import ChangeIcon from "../../assets/Icons/ChangeIcon";
import styles from "../../style/profile/profile-data";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SERVER } from "@env";

import BackCatalog from "../../assets/Icons/BackCatalog";
import { useNavigation } from "@react-navigation/native";

const ShowChangeDataComponent = ({
  data,
  verifyFun,
  showChangeData,
  setShowChangeData,
  dataInput,
  setDataInput,
}) => {
  const navigation = useNavigation();

  const changeData = async () => {
    try {
      await axios.post(`${SERVER}/auth/change/data`, {
        ...dataInput,
        id: data._id,
      });
      verifyFun();
      setShowChangeData(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <TouchableOpacity
          style={styles.back}
          onPress={() => {
            navigation.navigate("profile");
          }}
        >
          <BackCatalog />
          <Text style={styles.backText}>Особистий кабінет</Text>
        </TouchableOpacity>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.dataButton}
            onPress={() => {
              setShowChangeData(!showChangeData);
            }}
          >
            <Text style={styles.dataButtonText}>Особисті дані</Text>
            <ChangeIcon />
          </TouchableOpacity>
          <View style={styles.wrapperBlock}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputPlaceholder}>Ваше ім’я</Text>
              <TextInput
                style={styles.input()}
                value={dataInput.firstName}
                onChangeText={(value) => {
                  setDataInput({ ...dataInput, firstName: value });
                }}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputPlaceholder}>Прізвище</Text>
              <TextInput
                style={styles.input()}
                value={dataInput.lastName}
                onChangeText={(value) =>
                  setDataInput({ ...dataInput, lastName: value })
                }
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputPlaceholder}>Дата народження</Text>
              <TextInput
                style={styles.input()}
                value={dataInput.birthday}
                onChangeText={(value) =>
                  setDataInput({ ...dataInput, birthday: value })
                }
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputPlaceholder}>Телефон</Text>
              <TextInput
                style={styles.input()}
                value={dataInput.phone}
                onChangeText={(value) =>
                  setDataInput({ ...dataInput, phone: value })
                }
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputPlaceholder}>Ел. почта</Text>
              <TextInput
                style={styles.input()}
                value={dataInput.email}
                onChangeText={(value) =>
                  setDataInput({ ...dataInput, email: value })
                }
              />
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={changeData}>
              <Text style={styles.saveButtonText}>Зберегти</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

export default ShowChangeDataComponent;
