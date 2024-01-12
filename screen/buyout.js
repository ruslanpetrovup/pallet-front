import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Alert,
} from "react-native";
import Navigation from "../components/Navigation";
import styles from "../style/buyout";
import { useRef, useState } from "react";
import CheckBoxIcon from "../assets/Icons/CheckBoxIcon";
import FileIcon from "../assets/Icons/FileIcon";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import useVerify from "../components/hook/useVerify";
import { SERVER_ADMIN } from "@env";
import { useNavigation } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import buyoutReturnPrice from "../components/buyoutReturnPrice";

const Buyout = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [sizeData, setSizeData] = useState([
    {
      title: "800*1200 (європалета з маркуванням EUR, UIC, EPAL)",
      active: true,
    },
    {
      title: "800x1200 (звичайний без маркування)",
      active: false,
    },
    {
      title: "1000x1200",
      active: false,
    },

    {
      title: "1100x1300",
      active: false,
    },
    {
      title: "1200x1200",
      active: false,
    },
    {
      title: "1000х1000",
      active: false,
    },
    {
      title: "мікс кількох типів",
      active: false,
    },
  ]);

  const [stateData, setStateData] = useState([
    {
      title: "світлий",
      active: true,
    },
    {
      title: "світлий з потемнінням",
      active: false,
    },
    {
      title: "темний",
      active: false,
    },
  ]);

  const searchPrice = () => {
    let currentSizeData = 0;
    let currentStateData = 0;

    sizeData.forEach((item, index) => {
      if (item.active) {
        currentSizeData = index;
      }
    });

    stateData.forEach((item, index) => {
      if (item.active) {
        currentStateData = index;
      }
    });

    return buyoutReturnPrice(currentSizeData, currentStateData);
  };

  const [inputScore, setInputScore] = useState("");
  const [errorScore, setErrorScore] = useState(false);
  const inputScoreRef = useRef(null);
  const scrollViewRef = useRef(null);

  const [inputAddress, setInputAddress] = useState("");
  const inputAddressRef = useRef(null);

  const inputScoreFun = (value) => {
    const numbersOnly = value.replace(/\D/g, "");

    setInputScore(numbersOnly);
  };

  const selectSize = (title) => {
    const newSize = sizeData.map((item) => {
      if (item.title === title) {
        return {
          title: item.title,
          active: true,
        };
      } else {
        return {
          title: item.title,
          active: false,
        };
      }
    });
    setSizeData(newSize);
  };

  const selectState = (title) => {
    const newSize = stateData.map((item) => {
      if (item.title === title) {
        return {
          title: item.title,
          active: true,
        };
      } else {
        return {
          title: item.title,
          active: false,
        };
      }
    });
    setStateData(newSize);
  };

  const [selectCurrentImage, setSelectCurrentImage] = useState([]);
  const [dataImage, setDataImage] = useState(null);
  const [errorImage, setErrorImage] = useState(false);

  const selectFile = async () => {
    setErrorImage(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1,
      allowsMultipleSelection: true,
    });

    console.log(result);

    if (!result.cancelled) {
      if (result?.selected === undefined) {
        result.selected = [result];
      }
      const selectedFormData = [];
      const selectedUri = [];

      result.selected.forEach((item, index) => {
        const itemUri = item.uri.split(".");
        const typeFile = itemUri[itemUri.length - 1];

        const randomNumber = new Date();
        const formData = new FormData();
        formData.append("file", {
          uri: item.uri,
          type: `image/${typeFile}`,
          fileName: "buyout",
          name: `buyout ${randomNumber}.${typeFile}`,
        });

        selectedUri.push(item.uri);
        selectedFormData.push(formData);
      });

      setDataImage(selectedFormData);
      setSelectCurrentImage(selectedUri);
    } else {
      setDataImage(null);
      setSelectCurrentImage([]);
      Alert.alert("error", "You did not select any image.");
    }
  };

  const submitFetch = async () => {
    const activeSize = sizeData.find((item) => item.active);
    const activeState = stateData.find((item) => item.active);

    if (inputScore === "" || Number(inputScore) === 0) {
      setErrorScore(true);

      if (inputScoreRef.current) {
        console.log("Ok");
        inputScoreRef.current.measureLayout(scrollViewRef.current, (x, y) => {
          console.log(y);
          scrollViewRef.current.scrollTo({ y: y, animated: true });
        });
      }
      return;
    }

    if (!activeSize || !activeState || !inputScore) return;
    const size = activeSize.title;
    const state = activeState.title;

    const { dataFetch } = await useVerify();
    const { firstName, lastName, phone } = dataFetch;

    if (dataImage) {
      if (dataImage === null) return;
      setLoading(true);

      const createImageRequest = [];
      const delay = 500;

      for (const item of dataImage) {
        const config = {
          method: "post",
          url: "https://admin.palletdvor.com.ua/api/media",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: item,
        };

        const response = await sendRequestWithDelay(config, delay);
        createImageRequest.push(response.data);
      }

      async function sendRequestWithDelay(config, delay) {
        return new Promise((resolve) => {
          setTimeout(async () => {
            const response = await axios(config);
            resolve(response);
          }, delay);
        });
      }

      const allResponses = await Promise.all(createImageRequest);

      const imagesId = allResponses.map((item) => {
        return {
          id: item.doc.id,
          image: item.doc.id,
        };
      });
      console.log(imagesId);

      try {
        const result = await axios.post(`${SERVER_ADMIN}/api/buyout`, {
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          size: size,
          state: state,
          score: inputScore,
          address: inputAddress,
          images: imagesId,
        });
        console.log(result.data.doc);

        await AsyncStorage.setItem("buyout", JSON.stringify(result.data.doc));

        setLoading(false);
        navigation.navigate("buyout-result");
      } catch (err) {
        console.log(err);
      }
    } else {
      setErrorImage(true);
    }
  };

  return (
    <>
      <View>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Хочу продати піддони</Text>
        </View>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 220 }}
          ref={scrollViewRef}
        >
          <View style={styles.titleWrapperSecond}>
            <Text style={styles.title}>Розмір піддону</Text>
          </View>
          <View style={styles.size}>
            {sizeData.map((item, index) => (
              <TouchableOpacity
                style={styles.sizeItem(
                  item.active,
                  index === sizeData.length - 1 ? true : false
                )}
                key={item.title}
                onPress={() => {
                  selectSize(item.title);
                }}
              >
                <View style={styles.sizeItemIcon(item.active)}></View>
                <Text style={styles.sizeItemText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.titleSecondWrapper}>
            <Text style={styles.titleSecond}>Стан</Text>
          </View>

          <View style={styles.size}>
            {stateData.map((item, index) => (
              <TouchableOpacity
                style={styles.sizeItem(
                  item.active,
                  index === stateData.length - 1 ? true : false
                )}
                key={item.title}
                onPress={() => {
                  selectState(item.title);
                }}
              >
                <View style={styles.sizeItemIcon(item.active)}></View>
                <Text style={styles.sizeItemText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.titleSecondWrapper}>
            <Text style={styles.titleSecond}>Кількість</Text>
          </View>

          <View style={styles.inputScoreWrapper}>
            <TextInput
              style={styles.inputScore(errorScore)}
              value={inputScore}
              onChangeText={inputScoreFun}
              onFocus={() => {
                if (inputScoreRef.current) {
                  inputScoreRef.current.measureLayout(
                    scrollViewRef.current,
                    (x, y) => {
                      scrollViewRef.current.scrollTo({ y: y, animated: true });
                    }
                  );
                }
                setErrorScore(false);
              }}
              ref={inputScoreRef}
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: "#49454F",
                textAlign: "center",
                marginBottom: 5,
                textTransform: "uppercase",
              }}
            >
              Орієнтована вартість
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "500",
                color: "#F40000",
                textAlign: "center",
                marginBottom: 5,
              }}
            >
              {searchPrice()}
            </Text>
          </View>

          {inputScore === "" ? (
            <></>
          ) : (
            <View style={styles.bannerBonusWrapper}>
              <View style={styles.bannerBonus}>
                <Text style={styles.bannerBonusTitle}>Нарахування бонусів</Text>
                <Text style={styles.bannerBonusText}>
                  Після завершення угоди Вам будуть нараховані бонуси, які Ви
                  зможете обміняти за програмою лояльності{" "}
                </Text>
                <View style={styles.bannerBonusScoreWrapper}>
                  <Text style={styles.bannerBonusScore}>{inputScore}</Text>
                  <Text style={styles.bannerBonusScoreText}>бонусів</Text>
                </View>
              </View>
            </View>
          )}

          <View style={styles.showFileWrapper}>
            <Text style={styles.showFileDesc}>
              Для детальної оцінки надішліть фото піддонів та вкажіть адресу.
            </Text>

            <View style={styles.fileInput}>
              <TouchableOpacity
                style={styles.fileInputButton}
                onPress={selectFile}
              >
                <FileIcon />
                <Text style={styles.fileInputButtonText}>Прикріпити файл</Text>
              </TouchableOpacity>
              <Text
                style={{
                  ...styles.showFileDesc,
                  color: "#F40000",
                  fontWeight: "400",
                  opacity: errorImage ? 1 : 0,
                }}
              >
                Завантажте фото
              </Text>

              {selectCurrentImage.length === 0 ? (
                <></>
              ) : (
                <>
                  {selectCurrentImage.map((item, index) => (
                    <Image
                      key={index}
                      source={{ uri: item }}
                      style={{ width: 200, height: 200, marginTop: 20 }}
                      resizeMode="contain"
                    />
                  ))}
                </>
              )}
            </View>
          </View>
          <View style={{ ...styles.titleSecondWrapper, marginTop: 20 }}>
            <Text style={styles.titleSecond}>Вказати адресу</Text>
          </View>

          <View style={styles.inputScoreWrapper}>
            <TextInput
              style={styles.inputScore(errorScore)}
              value={inputAddress}
              onChangeText={(value) => setInputAddress(value)}
              ref={inputAddressRef}
              onFocus={() => {
                if (inputAddressRef.current) {
                  inputAddressRef.current.measureLayout(
                    scrollViewRef.current,
                    (x, y) => {
                      scrollViewRef.current.scrollTo({
                        y: y,
                        animated: true,
                      });
                    }
                  );
                }
              }}
            />
          </View>

          <View style={styles.acceptButtonWrapper}>
            <TouchableOpacity style={styles.acceptButton} onPress={submitFetch}>
              <Text style={styles.acceptButtonText}>Отримати точну ціну</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={{ color: "white" }}
      />
      <Navigation />
      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default Buyout;
