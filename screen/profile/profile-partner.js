import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Navigation from "../../components/Navigation";
import styles from "../../style/profile/profile-partner";
import { useNavigation, useRoute } from "@react-navigation/native";
import BackCatalog from "../../assets/Icons/BackCatalog";
import { StatusBar } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import stylesBuyout from "../../style/buyout";
import CloseBasket from "../../assets/Icons/CloseBasket";
import { useState } from "react";
import axios from "axios";
import { SERVER_ADMIN } from "@env";
import useVerify from "../../components/hook/useVerify";

const partnerData = [
  {
    title: "Що значить бути партнером?",
    desc: "Компанія надає ціну на викуп піддонів з ринку по конкурентно вигідним умовам, допомагає оптимізувати процеси, консультує по питанням «як збільшувати обсяги» та роз’яснює щодо стандартів піддонів та трендів індустрії.",
  },
  {
    title: "Чому вигідно бути партнером?",
    desc: "Нам важлива ваша думка що до співпраці. З вас відгук - з нас запашна кава",
  },
  {
    title: "Яка процедура партнерства? ",
    desc: "Ви надаєте інформацію де знаходиться Ваша локація, її характеристики та деталі щодо її використання. Вам надається інформація щодо стандартів піддонів, ціни, контакти координатора та додаткова інформація.",
  },
  {
    title: "Чи не ускладнює це життя?",
    desc: "Ні. Тому що Вас не інтегрують в систему. Ви незалежні в своїх рішеннях і діях. Це додана цінність з території яка Вам не приносить в даний момент кошти і мінімальна кількість часу для реалізації дій.",
  },
];

const ProfilePartner = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const prevScreenReturn = () => {
    let prevScreenPath = "";
    if (route.params !== undefined) {
      if (
        route.params.prevScreen !== undefined &&
        route.params.prevScreen !== ""
      ) {
        prevScreenPath = route.params.prevScreen;
        return true;
      }
    }
    return false;
  };

  const createRequestPartner = async () => {
    const { dataFetch } = await useVerify();
    console.log("test:", SERVER_ADMIN);
    await axios.post(`${SERVER_ADMIN}/api/request-partner`, {
      firstName: dataFetch.firstName,
      phone: dataFetch.phone,
      message: "Партнерська програма",
    });

    setIsOpenModal(true);
  };

  const NotificationCall = () => {
    return (
      <>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 4,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => setIsOpenModal(false)}
            style={{ position: "absolute", top: 45, right: 15 }}
          >
            <CloseBasket color="white" width={40} height={40} />
          </TouchableOpacity>
          <View
            style={{
              width: "100%",
              height: 150,
              backgroundColor: "white",
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.title}>Запит прийнятий.</Text>
            <Text style={styles.title}>З вами зв'яжуться.</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      <View>
        <TouchableOpacity
          style={styles.back}
          onPress={() =>
            navigation.navigate(
              prevScreenReturn() ? route.params.prevScreen : "profile"
            )
          }
        >
          <BackCatalog />
          <Text style={styles.backText}>Партнерська програма</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView>
        <View style={styles.content}>
          {partnerData.map((item, index) => (
            <View style={styles.wrapper} key={index}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.desc}</Text>
            </View>
          ))}
          <View style={{ paddingHorizontal: 8 }}>
            <TouchableOpacity
              style={stylesBuyout.acceptButton}
              onPress={() => createRequestPartner()}
            >
              <Text style={stylesBuyout.acceptButtonText}>Хочу долучитись</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
      {isOpenModal ? <NotificationCall /> : <></>}
      <Navigation active="profile" />
      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default ProfilePartner;
