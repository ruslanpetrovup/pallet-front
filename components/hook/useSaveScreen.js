import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AppState } from "react-native";

const useSaveScreen = async (currentPage) => {
  const nextAppState = AppState.currentState;
  const test = await AsyncStorage.getItem("currentPage");

  //   console.log(test);

  if (nextAppState === "background") {
    try {
      await AsyncStorage.setItem("currentPage", currentPage);
    } catch (error) {
      console.log("Ошибка при сохранении состояния:", error);
    }
  }
};

export default useSaveScreen;
