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

const ProfileInfoAbout = () => {
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

            <Text style={styles.backText}>Про компанію </Text>
          </View>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.wrapper}>
            <Text style={styles.desc}>
              Передивлюючись корпоративні сайти наших європейських колег, бачимо
              багато компаній, які започаткували свою діяльність в далеких
              1930-х рр та мають глибоке коріння. Цілі династії, які продовжують
              розвивати фамільне ремесло. Це нас неймовірно надихає!В Україні
              галузь тари та пакування почала формуватися в 90-х рр, а у
              двохтисячних набула найактивнішого розвитку. Ми започаткували свою
              діяльність у 2005 році. Майже відразу налагодили співпрацю з
              національними виробниками, корпоративним сектором та торгівельними
              мережами. За кілька років виробництвом якісного продукту підкорили
              і Європейський ринок. Пережили кризи 2008-го, 2014-го років, а
              зараз, під час військових дій у 2022-2023 роках, вдалося не
              зупинитися, а й далі рухатися, підтримуючи економіку України,
              зберігши робочі місця та нарощуючи об'єми.Створюємо сучасні
              комфортні умови нашим співробітникам. Вибудовуємо не просто ділові
              стосунки, а справжнє взаємовигідне партнерство. Нас рекомендує
              національний бізнес-рейтинг та наші клієнти. Створюємо екосистему,
              а не просто обіг товару та грошей. Безмежно вдячні за довіру.
              Йдемо назустріч новим знайомствам, можливостям та звершенням!
            </Text>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.title}>Наші клієнти</Text>
            <Text style={styles.desc}>
              Кожен бізнес націлений запропонувати ТОПовий продукт, це означає -
              формування внутрішніх та зовнішніх цінностей та вимог. Відповідати
              таким вимогам та налагоджувати багаторічні партнерські стосунки з
              лідерами ринку наше фундаментальне правило.
            </Text>

            <View style={styles.table}>
              <View style={styles.tableColumn(5)}>
                <View style={styles.tableRow()}>
                  <Image style={styles.tableImage} source={company1} />
                </View>
                <View style={styles.tableRow("#363636")}>
                  <Image style={styles.tableImage} source={company2} />
                </View>
              </View>
              <View style={styles.tableColumn(5)}>
                <View style={styles.tableRow()}>
                  <Image style={styles.tableImage} source={company3} />
                </View>
                <View style={styles.tableRow("#363636")}>
                  <Image style={styles.tableImage} source={company4} />
                </View>
              </View>
              <View style={styles.tableColumn(5)}>
                <View style={styles.tableRow()}>
                  <Image style={styles.tableImage} source={company5} />
                </View>
                <View style={styles.tableRow("#363636")}>
                  <Image style={styles.tableImage} source={company6} />
                </View>
              </View>
              <View style={styles.tableColumn(5)}>
                <View style={styles.tableRow()}>
                  <Image style={styles.tableImage} source={company7} />
                </View>
                <View style={styles.tableRow("#363636")}>
                  <Image style={styles.tableImage} source={company8} />
                </View>
              </View>
              <View style={styles.tableColumn(5)}>
                <View style={styles.tableRow()}>
                  <Image style={styles.tableImage} source={company9} />
                </View>
                <View style={styles.tableRow("#363636")}>
                  <Image style={styles.tableImage} source={company10} />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.wrapper}>
            <Text style={styles.title}>Наші сервіси</Text>
            <Text style={styles.titleSecond}>ВИГОТОВЛЕННЯ ПІДДОНІВ</Text>
            <Text style={styles.desc}>
              Повним циклом виготовлення дерев'яної тари досягається головне
              завдання - отримати вироби трьох сортів повністю перекривають
              потреби внутрішнього ринку України і експортних операцій: від
              невигадливих будівельних Напівпіддони до европаллет стандарту EUR,
              UIC.
            </Text>
          </View>

          <View style={styles.wrapper}>
            <Text style={styles.titleSecond}>ВИКУП ПІДДОНІВ</Text>
            <Text style={styles.desc}>
              Надлишок дерев'яної тари з часом стає проблемою як для дрібних так
              і великих компаній. Ми допоможемо звільнити виробничу і складську
              площу від незатребуваних палет. Оперативно проведемо оцінку,
              узгодження ціни і вивезення піддонів.
            </Text>
          </View>

          <View style={styles.wrapper}>
            <Text style={styles.titleSecond}>РЕМОНТ ПАЛЕТ</Text>
            <Text style={styles.desc}>
              Маємо великий досвід в ремонті і відновленні палет так як нашими
              замовниками стали Оболонь, Карлсберг, СанІнБев, Велика Кишеня, ІДС
              і інші національні корпорації. Спеціалізоване пневмо- і
              електрообладнання - обов'язкова умова якісно виконаних робіт і
              гарантії довговічності.
            </Text>
          </View>
        </ScrollView>
      </View>
      <Navigation active="profile" />
      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default ProfileInfoAbout;
