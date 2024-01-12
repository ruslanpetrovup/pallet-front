import { StyleSheet } from "react-native";

const profileNotificationStyle = StyleSheet.create({
  back: {
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 30,
  },
  backText: {
    fontSize: 22,
    fontWeight: "600",
  },
  wrapper: {
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 20,
  },
  wrapperText: {
    maxWidth: 227,
  },
  wrapperTextTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "rgba(0, 0, 0, 0.6)",
  },
  wrapperTextDesc: {
    fontSize: 13,
    fontWeight: "400",
    color: "rgba(0, 0, 0, 0.6)",
    marginTop: 5,
  },
  buttonIs: (active = false) => {
    return {
      position: "relative",
      width: 52,
      height: 32,
      backgroundColor: active
        ? "rgba(244, 0, 0, 0.74)"
        : "rgba(29, 27, 32, 0.12)",

      borderRadius: 100,
    };
  },
  buttonIsView: (active = false) => {
    return {
      position: "absolute",
      top: "50%",
      left: active ? 24 : 4,
      width: 24,
      height: 24,
      transform: [{ translateY: -12 }],
      backgroundColor: "#FFFFFF",
      borderRadius: 23,
    };
  },
});

export default profileNotificationStyle;
