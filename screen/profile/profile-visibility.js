import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import Navigation from "../../components/Navigation";
import { StatusBar } from "react-native";
import styles from "../../style/profile/profile-visibility";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import BackCatalog from "../../assets/Icons/BackCatalog";
import catalog from "../../assets/catalog.png";
import CatalogPlus from "../../assets/Icons/CatalogPlus";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_ADMIN } from "@env";

const ProfileVisibility = () => {
  const isFocusScreen = useIsFocused();
  const navigation = useNavigation();
  const [visibilityData, setVisibilityData] = useState([]);

  const requestHistory = async () => {
    const getHistory = await AsyncStorage.getItem("catalogHistory");

    if (!getHistory) return setVisibilityData([]);

    return setVisibilityData(JSON.parse(getHistory));
  };
  useEffect(() => {
    requestHistory();
  }, [isFocusScreen]);
  return (
    <>
      <View style={{ paddingBottom: 200 }}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate("profile")}
        >
          <View style={{ flexDirection: "row" }}>
            <BackCatalog />

            <Text style={styles.backText}>Переглядали раніше</Text>
          </View>
        </TouchableOpacity>

        <ScrollView>
          <View style={styles.catalogContainer}>
            {visibilityData.length === 0 ? (
              <></>
            ) : (
              <>
                {visibilityData.map((item, index) => (
                  <TouchableOpacity
                    onPress={() =>
                      router.navigate("catalog-item", { id: item.id })
                    }
                    key={item.id}
                    style={styles.catalogItem}
                  >
                    <View style={styles.catalogImage}>
                      <Image
                        source={{
                          uri: `${SERVER_ADMIN}/media/${item.images[0].catalog.filename}`,
                        }}
                        style={styles.catalogImg}
                        resizeMode="center"
                      />
                    </View>
                    <View style={styles.catalogContent}>
                      <Text style={styles.catalogTitle}>{item.name}</Text>
                      <Text style={styles.catalogDesc}>
                        Розміри: {item.size}(мм).
                      </Text>
                      <Text style={styles.catalogDesc}>
                        Навантаження: до {item.upload}кг.
                      </Text>

                      <TouchableOpacity
                        onPress={() => addBasketItem(item.id)}
                        style={styles.catalogBasket}
                      >
                        <CatalogPlus />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
              </>
            )}
          </View>
        </ScrollView>
      </View>
      <Navigation active="profile" />
      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default ProfileVisibility;
