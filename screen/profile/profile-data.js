import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
import Navigation from "../../components/Navigation";
import styles from "../../style/profile/profile-data";
import BackCatalog from "../../assets/Icons/BackCatalog";
import ChangeIcon from "../../assets/Icons/ChangeIcon";
import ChangePassword from "../../components/profile/ChangePassword";
import ProfileDataComponent from "../../components/profile/ProfileData";
import useVerify from "../../components/hook/useVerify";
import { SERVER } from "@env";
import ChangeProfileDataComponent from "../../components/profile/ChangeProfileData";

import Toast, { ErrorToast } from "react-native-toast-message";

const ProfileData = () => {
  const [isShowPassModal, setIsShowPassModal] = useState(false);
  const [showChangeData, setShowChangeData] = useState(false);
  const [showChangeAddress, setShowChangeAddress] = useState(false);

  const navigation = useNavigation();
  const isFocusScreen = useIsFocused();

  const [data, setData] = useState({
    _id: "",
    delivery: {
      _id: "",
      city: "",
      house: "",
      index: "",
      region: "",
      street: "",
    },
    birthday: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    phone: "",
  });

  const [dataInput, setDataInput] = useState({
    birthday: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [deliveryInput, setDeliveryInput] = useState({
    city: "",
    house: "",
    index: "",
    region: "",
    street: "",
  });

  const verifyFun = async () => {
    const { verify, dataFetch } = await useVerify();

    setData(dataFetch);
    setDataInput({
      birthday: dataFetch.birthday,
      email: dataFetch.email,
      firstName: dataFetch.firstName,
      lastName: dataFetch.lastName,
      phone: dataFetch.phone,
    });

    setDeliveryInput({
      city: dataFetch.delivery.city,
      house: dataFetch.delivery.house,
      index: dataFetch.delivery.index,
      region: dataFetch.delivery.region,
      street: dataFetch.delivery.street,
    });
  };

  const changePassword = async (value) => {
    try {
      const result = await axios.post(`${SERVER}/auth/change/password`, {
        id: data._id,
        currentPassword: value.currentPassword,
        newPassword: value.newPassword,
      });

      if (result.data.code === 401) {
        return result.data;
      }

      Toast.show({
        type: "info",
        text1: "Успіх",
        text2: "Ваш пароль було змінено",
        autoHide: false,
        onPress: () => Toast.hide(),
      });
      setIsShowPassModal(false);
      verifyFun();
      return result.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    verifyFun();
  }, [isFocusScreen]);

  return (
    <>
      <View
        style={{
          paddingBottom: 220,
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

        <View>
          <TouchableOpacity
            style={styles.dataButton}
            onPress={() => setShowChangeData(!showChangeData)}
          >
            <Text style={styles.dataButtonText}>Особисті дані</Text>
            <ChangeIcon />
          </TouchableOpacity>

          {showChangeData ? <></> : <ProfileDataComponent data={data} />}
        </View>

        <View style={styles.address}>
          <TouchableOpacity
            style={styles.dataButton}
            onPress={() => setShowChangeAddress(!showChangeAddress)}
          >
            <Text style={styles.dataButtonText}>Адреса доставки</Text>
            <ChangeIcon />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.changePassword}
          onPress={() => setIsShowPassModal(!isShowPassModal)}
        >
          <Text style={styles.changePasswordText}>Змінити пароль</Text>
        </TouchableOpacity>
      </View>

      <ChangePassword
        show={isShowPassModal}
        showFunc={setIsShowPassModal}
        changePassword={changePassword}
      />

      <ChangeProfileDataComponent
        data={data}
        verifyFun={verifyFun}
        showChangeData={showChangeData}
        setShowChangeData={setShowChangeData}
        setShowChangeAddress={setShowChangeAddress}
        showChangeAddress={showChangeAddress}
        dataInput={dataInput}
        setDataInput={setDataInput}
        deliveryInput={deliveryInput}
        setDeliveryInput={setDeliveryInput}
      />

      <Navigation active="profile" />
      <StatusBar barStyle="dark-content" />
      <Toast />
    </>
  );
};

export default ProfileData;
