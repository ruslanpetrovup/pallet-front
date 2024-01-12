import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import Toast, { ErrorToast } from "react-native-toast-message";

const toastConfig = {
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 15,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
};

const NoInternet = ({ requestFunction = null }) => {
  const isFocusedScreen = useIsFocused();

  const checkInternet = async () => {
    const networkState = await NetInfo.fetch();
    console.log(networkState);
    if (networkState.isConnected && networkState.isInternetReachable) {
    } else {
      Toast.show({
        type: "error",
        text1: "Помилка",
        text2: "Немає підключення до інтернету.",
        autoHide: false,
        onPress: () => Toast.hide(),
      });
      subscribeToInternetConnection();
    }
  };

  const subscribeToInternetConnection = () => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected && state.isInternetReachable) {
        if (requestFunction !== null) {
          requestFunction();
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Помилка",
          text2: "Немає підключення до інтернету.",
          autoHide: true,
          onPress: () => Toast.hide(),
        });
      }
    });

    return unsubscribe;
  };

  useEffect(() => {
    if (isFocusedScreen) {
      checkInternet();
    }
  }, [isFocusedScreen]);
  return (
    <>
      <Toast config={toastConfig} />
    </>
  );
};

export default NoInternet;
