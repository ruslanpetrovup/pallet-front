import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import Navigation from "../../../components/Navigation";
import { StatusBar } from "react-native";
import styles from "../../../style/profile/profile-info";
import { useNavigation } from "@react-navigation/native";
import BackCatalog from "../../../assets/Icons/BackCatalog";
import company1 from "../../../assets/images/company/company-1.jpg";
import company2 from "../../../assets/images/company/company-2.jpg";
import company3 from "../../../assets/images/company/company-3.jpg";
import company4 from "../../../assets/images/company/company-4.jpg";
import company5 from "../../../assets/images/company/company-5.jpg";
import company6 from "../../../assets/images/company/company-6.jpg";
import company7 from "../../../assets/images/company/company-7.jpg";
import company8 from "../../../assets/images/company/company-8.jpg";
import company9 from "../../../assets/images/company/company-9.jpg";
import company10 from "../../../assets/images/company/company-10.jpg";

const ProfileInfoOffice = () => {
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

            <Text style={styles.backText}>Наші офіси </Text>
          </View>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.officeBlock}>
            <Text style={styles.officeTitle}>Центральний офіс:</Text>
            <Text style={styles.desc}>
              м Бровари, бул-р Незалежності 31, оф 406, 401
            </Text>

            <Text style={styles.officeTitleSecond}>
              Відділ продажів:{" "}
              <Text style={styles.desc}>+38 067 566 84 24</Text>
            </Text>
            <Text style={styles.officeTitleSecond}>
              Відділ закупівель:
              <Text style={styles.desc}>+38 067 368 25 53</Text>
            </Text>
            <Text style={styles.desc}>Email: office@palletdvor.com.ua</Text>
          </View>

          <View style={styles.officeBlock}>
            <Text style={styles.officeTitle}>Філія м.Львів</Text>
            <Text style={styles.desc}>вул. Городоцька 357</Text>

            <Text style={styles.officeTitleSecond}>
              Відділ продажів:
              <Text style={styles.desc}>+38 067 566 84 24</Text>
            </Text>
            <Text style={styles.officeTitleSecond}>
              Відділ закупівель:
              <Text style={styles.desc}>+38 098 099 84 88</Text>
            </Text>
          </View>

          <View style={styles.officeBlock}>
            <Text style={styles.officeTitle}>Філія м.Черкаси</Text>
            <Text style={styles.desc}>вул. Першотравнева 63</Text>

            <Text style={styles.officeTitleSecond}>
              Відділ продажів:
              <Text style={styles.desc}>+38 067 566 84 24</Text>
            </Text>
            <Text style={styles.officeTitleSecond}>
              Відділ закупівель:
              <Text style={styles.desc}>+38 067 539 16 16</Text>
            </Text>
          </View>

          <Text style={styles.titleSecond}>Територіальні менеджери</Text>
          <Text style={styles.desc}>
            працюють у наступних регіонах:Чернігів, Полтава, Кропивницький,
            Дніпро, Запоріжжя, Житомир, Рівне, Вінниця, Тернопіль, Ів-Франківськ
          </Text>
        </ScrollView>
      </View>
      <Navigation active="profile" />
      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default ProfileInfoOffice;
