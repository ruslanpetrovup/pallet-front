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

const ProfileOfferCertificate = () => {
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

            <Text style={styles.backText}>Сертифікати</Text>
          </View>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.containerContent}>
          <View style={styles.wrapper}>
            <Text style={styles.desc}>
              Ми вибудовуємо не просто ділові стосунки або взаємовигідні
              відносини, ми створюємо настрій адже вдячні за вашу довіру!
            </Text>
          </View>

          <View style={styles.wrapper}>
            <View style={styles.table}>
              <View style={styles.tableColumn(4)}>
                <View style={styles.tableRow()}>
                  <Text style={styles.tableText}>Угода від 100 піддонів</Text>
                </View>
                <View style={styles.tableRow("#363636")}>
                  <Text style={styles.tableText}>
                    Сертифікат на суму 500 грн
                  </Text>
                </View>
              </View>
              <View style={styles.tableColumn(4)}>
                <View style={styles.tableRow()}>
                  <Text style={styles.tableText}>Угода від 250 піддонів</Text>
                </View>
                <View style={styles.tableRow("#363636")}>
                  <Text style={styles.tableText}>
                    Сертифікат на суму 1000 грн
                  </Text>
                </View>
              </View>
              <View style={styles.tableColumn(4)}>
                <View style={styles.tableRow()}>
                  <Text style={styles.tableText}>Угода від 500 піддонів</Text>
                </View>
                <View style={styles.tableRow("#363636")}>
                  <Text style={styles.tableText}>
                    Сертифікат на суму 2000 грн
                  </Text>
                </View>
              </View>
              <View style={styles.tableColumn(4)}>
                <View style={styles.tableRow()}>
                  <Text style={styles.tableText}>Угода від 750 піддонів</Text>
                </View>
                <View style={styles.tableRow("#363636")}>
                  <Text style={styles.tableText}>
                    Сертифікат на суму 3500 грн
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.wrapper}>
            <View style={styles.wrapperGap}>
              <Text style={styles.titleSecond}>
                Список брендів на які діє Сертифікат MD Fashion:
              </Text>
            </View>
            <View style={styles.wrapperGap}>
              <Text style={styles.desc}>
                Under Armour, Diesel, PUMA, Replay, G-Star RAW, Guess, adidas,
                Levi’s, Tommy Hilfiger, Calvin Klein і багато інших (всі бренди
                на сайті MD Fashion).
              </Text>
            </View>
            <View style={styles.wrapperGap}>
              <Text style={styles.titleSecond}>
                Пропозиції брендів Ви можете переглянути на сайті Bodo MD
                Fashion за посиланням:
              </Text>
            </View>
            <View style={styles.wrapperGap}>
              <Text style={styles.desc}>
                https://md-fashion.com.ua/ua
                (https://my.manychat.com/r?act=df92dc7e1301c1668e4acb3bc6b76dca&u=1889125991&p=603756&h=396be12fe0)
              </Text>
            </View>
            <View style={styles.wrapperGap}>
              <Text style={styles.desc}>
                або натиснувши на кнопку "Сайт MD Fashion"
              </Text>
            </View>
            <View style={styles.wrapperGap}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  Linking.openURL("https://md-fashion.com.ua/ua");
                }}
              >
                <Text style={styles.buttonText}>Сайт MD Fashion </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.wrapperGap}>
              <Text style={styles.titleSecond}>
                Список вражень від Bodo Ви можете переглянути на сайті Bodo за
                посиланням:
              </Text>
            </View>
            <Text style={styles.desc}>
              https://www.bodo.ua/ua/
              (https://my.manychat.com/r?act=6ea5634e0f7e21f5a2e04c41579409b9&u=1889125991&p=603756&h=aa2607c5ff)
            </Text>
          </View>
        </ScrollView>
      </View>
      <Navigation active="profile" />
      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default ProfileOfferCertificate;
