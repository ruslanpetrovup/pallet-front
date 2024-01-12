import { View, Text, TouchableOpacity, TextInput } from "react-native";
import axios from "axios";
import ChangeIcon from "../../assets/Icons/ChangeIcon";
import styles from "../../style/profile/profile-data";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SERVER } from "@env";

import BackCatalog from "../../assets/Icons/BackCatalog";
import { useNavigation } from "@react-navigation/native";

const ShowChangeAddressComponent = ({
  data,
  verifyFun,
  showChangeAddress,
  setShowChangeAddress,
  deliveryInput,
  setDeliveryInput,
}) => {
  const navigation = useNavigation();

  const changeDelivery = async () => {
    try {
      const result = await axios.post(`${SERVER}/auth/change/delivery`, {
        ...deliveryInput,
        id: data._id,
      });
      verifyFun();
      setShowChangeAddress(false);
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
            onPress={() => setShowChangeAddress(!showChangeAddress)}
          >
            <Text style={styles.dataButtonText}>Адреса доставки</Text>
            <ChangeIcon />
          </TouchableOpacity>

          <View style={styles.wrapperBlock}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputPlaceholder}>Область</Text>
              <TextInput
                style={styles.input()}
                onChangeText={(value) =>
                  setDeliveryInput({
                    ...deliveryInput,
                    region: value,
                  })
                }
                value={deliveryInput.region}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputPlaceholder}>
                Місто або населений пункт
              </Text>
              <TextInput
                style={styles.input()}
                onChangeText={(value) =>
                  setDeliveryInput({
                    ...deliveryInput,
                    city: value,
                  })
                }
                value={deliveryInput.city}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputPlaceholder}>Вулиця</Text>
              <TextInput
                style={styles.input()}
                onChangeText={(value) =>
                  setDeliveryInput({
                    ...deliveryInput,
                    street: value,
                  })
                }
                value={deliveryInput.street}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputPlaceholder}>Номер будинку</Text>
              <TextInput
                style={styles.input()}
                onChangeText={(value) =>
                  setDeliveryInput({
                    ...deliveryInput,
                    house: value,
                  })
                }
                value={deliveryInput.house}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputPlaceholder}>Почтовий індекс</Text>
              <TextInput
                style={styles.input()}
                onChangeText={(value) =>
                  setDeliveryInput({
                    ...deliveryInput,
                    index: value,
                  })
                }
                value={deliveryInput.index}
              />
            </View>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={changeDelivery}
            >
              <Text style={styles.saveButtonText}>Зберегти</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

export default ShowChangeAddressComponent;
