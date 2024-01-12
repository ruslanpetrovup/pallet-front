import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import Navigation from "../../../components/Navigation";
import { StatusBar } from "react-native";
import styles from "../../../style/profile/profile-offer";
import { useNavigation, useRoute } from "@react-navigation/native";
import BackCatalog from "../../../assets/Icons/BackCatalog";
import {} from "react";

const ProfileOfferGift = () => {
  const navigation = useNavigation();
  const route = useRoute();
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
  return (
    <>
      <View>
        <TouchableOpacity
          style={styles.back}
          onPress={() =>
            navigation.navigate(
              prevScreenReturn() ? route.params.prevScreen : "profile/offer"
            )
          }
        >
          <View style={{ flexDirection: "row" }}>
            <BackCatalog />

            <Text style={styles.backText}>Подарунок колективу</Text>
          </View>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.containerContent}>
          <View style={styles.wrapper}>
            <View style={styles.wrapperGap}>
              <Text style={styles.title}>Зроби подарунок своєму колективу</Text>
            </View>
            <Text style={styles.desc}>
              Колектив, це люди з якими ми проводимо багато часу. Ми хочемо бути
              частиною Ваших історій і тому реалізували пропозицію для
              проведення спільного і смачного обіду з колективом.
            </Text>
          </View>

          <View style={styles.wrapper}>
            <View style={styles.table}>
              <View style={styles.tableColumn(3)}>
                <View style={styles.tableRow()}>
                  <Text style={styles.tableText}>Угода від 250 піддонів</Text>
                </View>
                <View style={styles.tableRow("#363636")}>
                  <Text style={styles.tableText}>Середня піца</Text>
                </View>
              </View>
              <View style={styles.tableColumn(3)}>
                <View style={styles.tableRow()}>
                  <Text style={styles.tableText}>Угода від 500 піддонів</Text>
                </View>
                <View style={styles.tableRow("#363636")}>
                  <Text style={styles.tableText}>Велика піца</Text>
                </View>
              </View>
              <View style={styles.tableColumn(3)}>
                <View style={styles.tableRow()}>
                  <Text style={styles.tableText}>Угода від 250 піддонів</Text>
                </View>
                <View style={styles.tableRow("#363636")}>
                  <Text style={styles.tableText}>Піца + Суші</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.wrapper}>
            <View style={styles.wrapperGap}>
              <Text style={styles.titleSecond}>
                Зроби замовлення і наступного дня на Вас чекатиме смачний
                обідній подарунок.
              </Text>
            </View>

            <Text style={styles.descSecond}>
              (Відправляємо наступного дня після фактичного відвантаження Вашого
              замовлення. Для клієнтів компанії Палетний Двір)
            </Text>
          </View>

          <View style={styles.wrapper}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                Linking.openURL("https://t.me/PalletDvir_bot");
              }}
            >
              <Text style={styles.buttonText}>
                Перейти в бот “Палетний двір”{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <Navigation active="profile" />
      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default ProfileOfferGift;
