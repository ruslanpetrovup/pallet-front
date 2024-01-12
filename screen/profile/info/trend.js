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
import styles from "../../../style/profile/profile-info";
import { useNavigation } from "@react-navigation/native";
import BackCatalog from "../../../assets/Icons/BackCatalog";

const ProfileInfoTrend = () => {
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

            <Text style={styles.backText}>Тренди індустрії </Text>
          </View>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.titleSecond}>
            Тренди індустрії тари і упаковки в Україні та світі.
          </Text>
          <Text style={styles.desc}>
            Щоб дізнатись про це, перейдіть по посиланню{" "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL("https://www.facebook.com/palletdvor");
            }}
            style={{ paddingHorizontal: 16 }}
          >
            <Text style={styles.link}>посиланя </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <Navigation active="profile" />
      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default ProfileInfoTrend;
