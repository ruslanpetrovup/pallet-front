import { Text, TouchableOpacity } from "react-native";
// import * as Notifications from "expo-notifications";

const Test33 = () => {
  // Notifications.setNotificationHandler({
  //   handleNotification: async () => ({
  //     shouldShowAlert: true,
  //     shouldPlaySound: false,
  //     shouldSetBadge: false,
  //   }),
  // });

  const handleSendNotification = async () => {
    //   const { status } = await Notifications.requestPermissionsAsync();
    //   if (status !== "granted") {
    //     return;
    //   }
    //   await Notifications.scheduleNotificationAsync({
    //     content: {
    //       title: "Look at that notification",
    //       body: "I'm so proud of myself!",
    //     },
    //     trigger: null,
    //   });
  };

  return (
    <TouchableOpacity
      onPress={handleSendNotification}
      style={{
        marginTop: 100,
        justifyContent: "center",
        borderColor: "black",
        borderWidth: 1,
        width: 100,
        height: 100,
      }}
    >
      <Text>TEST</Text>
    </TouchableOpacity>
  );
};

export default Test33;
