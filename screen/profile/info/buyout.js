import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import Navigation from "../../../components/Navigation";
import { StatusBar } from "react-native";
import styles from "../../../style/profile/profile-info";
import { useNavigation } from "@react-navigation/native";
import BackCatalog from "../../../assets/Icons/BackCatalog";

const listOrganization = [
  "оперативно узгодимо",
  "ціни транспорт день в день",
  "усі типи",
  "нові та вживані",
];

const listGroups = [
  "европалети 800х1200мм (I, II, III сорт)",
  "полегшений піддон 800х1200мм (I, II, III сорт)",
  "промисловий 1000х1200мм (I, II, III сорт)",
  "сировинний 1100х1300, 11400х1400, 1200х1200мм  (I, II, III сорт)полупіддон 600х800мм",
];

const ProfileInfoBuyout = () => {
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

            <Text style={styles.backText}>Викуп піддонів</Text>
          </View>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.officeBlock}>
            <Text style={styles.desc}>
              Наші територіальні представники в м. Київ, Київської,
              Чернігівської, Сумської, Полтавської, Черкаської, Вінницької та
              Житомирської областях оперативно проведуть оцінку піддонів і день
              в день ви зможете звільнити корисну складську площу від
              незатребуваної яка була у використанні тари.
            </Text>

            <Text style={{ ...styles.desc, marginTop: 20 }}>
              Вивіз тари з РЦ - знову актуальна тема для багатьох
              постачальників, ми організуємо для вас цю послугу швидко і
              кваліфіковано.
            </Text>

            <View style={{ ...styles.list, marginTop: 20 }}>
              {listOrganization.map((item, index) => (
                <View key={index} style={{ ...styles.item, marginLeft: 10 }}>
                  <View style={styles.itemDecore()}></View>
                  <Text style={styles.itemText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.officeBlock}>
            <Text style={styles.desc}>
              Сервіс по викупу б / у дерев'яної тари вимагає досвіду співпраці
              як з невеликими підприємствами які відвантажують незатребувані
              піддони з відкритих майданчиків в невеликій кількості так і з
              великими виробниками і логістичними центрами де відвантаження
              продукції пов'язана з оформленням супровідної документації,
              плануванням термінів подачі транспорту і можливості присутності
              представників з обох сторін. Вивіз палет з РЦ в регіонах, збірні
              відвантаження з філій і відділень - всі ці сервіси ми з радістю
              надамо вам в найкоротші терміни.
            </Text>
          </View>
          <View style={styles.officeBlock}>
            <Text style={styles.titleSecond}>
              Як правило поділяють такі групи палет
            </Text>

            <View style={{ ...styles.list, marginTop: 20 }}>
              {listGroups.map((item, index) => (
                <View key={index} style={{ ...styles.item, marginLeft: 10 }}>
                  <View style={styles.itemDecore()}></View>
                  <Text style={styles.itemText}>{item}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.desc}>
              Придбання дерев'яної тари від виробника - окремий напрямок
              діяльності нашої компанії. Після попередньої оцінки вашої
              продукції по фото або відео наш фахівець проведе виїзд на
              виробництво і всі необхідні виміри. Якщо ж у вас з якихось причин
              "зависла" партія палет ми допоможемо з її реалізацією. Маємо
              власний колосальний досвід виготовлення дерев'яної тари,
              допоможемо з підбором і придбанням інструменту та обладнання, їх
              обслуговування та ремонту.
            </Text>
          </View>
        </ScrollView>
      </View>
      <Navigation active="profile" />
      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default ProfileInfoBuyout;
