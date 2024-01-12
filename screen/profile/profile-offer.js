import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import Navigation from "../../components/Navigation";
import { StatusBar } from "react-native";
import styles from "../../style/profile/profile-offer";
import { useNavigation } from "@react-navigation/native";
import BackCatalog from "../../assets/Icons/BackCatalog";
import slider1 from "../../assets/images/slider/slide-1.jpg";
import slider2 from "../../assets/images/slider/slide-2.jpg";
import slider3 from "../../assets/images/slider/slide-3.jpg";
import slider4 from "../../assets/images/slider/slide-4.jpg";

const offersData = [
  {
    image: slider1,
    path: "bonus",
  },
  {
    image: slider2,
    path: "profile/offer/certificate",
  },
  {
    image: slider4,
    path: "profile/offer/gift",
  },
  {
    image: slider3,
    path: "profile/offer/referral",
  },
];

const ProfileOffer = () => {
  const navigation = useNavigation();
  return (
    <>
      <View>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate("profile")}
        >
          <View style={{ flexDirection: "row" }}>
            <BackCatalog />

            <Text style={styles.backText}>Пропозиції від компанії</Text>
          </View>
        </TouchableOpacity>

        <ScrollView>
          <View style={styles.offers}>
            {offersData.map((item, index) => (
              <TouchableOpacity
                style={styles.offersItem}
                activeOpacity={0.7}
                key={index}
                onPress={() => navigation.navigate(item.path)}
              >
                <Image source={item.image} style={styles.offersItemImage} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <Navigation active="profile" />
      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default ProfileOffer;
