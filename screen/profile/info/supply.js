import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import Navigation from "../../../components/Navigation";
import { StatusBar } from "react-native";
import styles from "../../../style/profile/profile-info";
import { useNavigation } from "@react-navigation/native";
import BackCatalog from "../../../assets/Icons/BackCatalog";
import DecoreIcon from "../../../assets/Icons/DecoreIcon";

const listMarket = [
  "наявність усього асортименту",
  "склади та представництва по всій Україні",
  "актуальні ціни- програми лояльності",
  "гарантії",
];

const buyList = [
  "Чуємо наших Клієнтів, поважаємо Вашу думку і цінності. Інтегруємо зручні канали комунікацій, CRM-модуля і IT-телефонія служать зручним інструментом своєчасної зв'язку.",
  "Національний бізнес рейтинг п'ятий рік поспіль нагороджує нас в програмі «Лідер року» і розмістив в реєстрі інвестиційно привабливих бізнес партнерів.",
  "Нас рекомендують клієнти! У нас позитивна репутація. З нами співпрацюють навіть переходячи на нове місце роботи. Велика частка ділових відносин пролонгується більше 12 років.",
];

const ProfileInfoSupply = () => {
  const navigation = useNavigation();
  return (
    <>
      <View>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate("profile/info")}
        >
          <View style={{ flexDirection: "row" }}>
            <BackCatalog />

            <Text style={styles.backText}>Поставка палет</Text>
          </View>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.officeBlock}>
            <Text style={styles.desc}>
              Займаємося поставками піддонів з 2005 року, стабільно, професійно,
              промислові об'єми, знання ринку, розуміння попиту:
            </Text>
            <View style={{ ...styles.list, marginTop: 20 }}>
              {listMarket.map((item) => (
                <View style={{ ...styles.item, marginLeft: 10 }}>
                  <View style={styles.itemDecore()}></View>
                  <Text style={styles.itemText}>{item}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.desc}>
              Нові та вживані піддони усіх типів та розмірів завжди в наявності
              на наших складах та представництвах по Україні.Закріплений саме за
              Вами фахівець проведе професійну консультацію і підбір відповідної
              дерев'яної тари, адже ми знаємо що у кожної галузі свої вимоги за
              габаритами, вантажопідйомності, міцності і іншим параметрам. З
              нами вибір і покупка тари будуть легкими, позбавленими затримок і
              зволікань.
            </Text>
          </View>

          <View style={styles.officeBlock}>
            <Text style={styles.title}>
              Купити піддони Київ - від компанії Палетний Двір
            </Text>

            <View style={{ ...styles.list, marginTop: 20 }}>
              {buyList.map((item) => (
                <View style={styles.item}>
                  <View style={styles.itemDecore(false)}>
                    <DecoreIcon />
                  </View>
                  <Text style={styles.itemText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
      <Navigation active="profile" />
      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default ProfileInfoSupply;
