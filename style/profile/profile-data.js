import { StyleSheet } from "react-native";

const profileDataStyle = StyleSheet.create({
  back: {
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    fontSize: 22,
    fontWeight: "600",
  },
  positionWrapper: (active = false) => {
    return {
      display: active ? "flex" : "none",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "#ffffff",
      zIndex: 3,
    };
  },
  // data: {
  //   // marginTop: 30,
  // },

  dataButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    width: "100%",
    height: 50,
  },
  dataButtonText: {
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  wrapper: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    borderBottomColor: "#E1E1E1",
    borderBottomWidth: 1,
  },
  wrapperBlock: {
    paddingHorizontal: 16,
  },
  wrapperHead: {
    fontSize: 13,
    fontWeight: "400",
    color: "rgba(0, 0, 0, 0.4)",
    marginBottom: 2,
  },
  wrapperSecond: {
    fontSize: 16,
    fontWeight: "400",
    color: "rgba(0, 0, 0, 0.6)",
  },
  address: {
    marginTop: 15,
  },
  saveButton: {
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginTop: 10,

    backgroundColor: "#272727",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.14,
    shadowRadius: 5,
    elevation: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  saveButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  changePassword: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  changePasswordText: {
    fontSize: 15,
    fontWeight: "600",
    textTransform: "uppercase",
    color: "rgba(244, 0, 0, 0.74)",
  },
  backdrop: (active = false) => {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      display: active ? "flex" : "none",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      width: "100%",
      height: "100%",
      zIndex: 3,
      paddingHorizontal: 16,
      alignItems: "center",
      justifyContent: "center",
    };
  },
  modal: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 20,
  },
  inputWrapper: {
    width: "100%",
    height: 44,
    position: "relative",
    marginBottom: 20,
  },
  input: (error = false) => {
    return {
      width: "100%",
      height: "100%",
      borderColor: error ? "#B00020" : "#B3B0AF",
      borderWidth: error ? 2 : 1.5,
      borderRadius: 5,
      paddingLeft: 15,
    };
  },

  inputPlaceholder: {
    position: "absolute",
    top: -6,
    left: 10,
    fontWeight: "600",
    fontSize: 12,
    paddingHorizontal: 4,
    color: "rgba(0, 0, 0, 0.6)",
    backgroundColor: "#ffffff",
    zIndex: 1,
  },
  showPass: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
  },
  showPassBorder: {
    width: 18,
    height: 18,
    borderColor: "#272727",
    borderWidth: 2,
    borderRadius: 3,
  },
  showPassText: {
    marginLeft: 11,
    fontSize: 12,
    fontWeight: "400",
    color: "#49454F",
  },
  warning: {
    fontSize: 12,
    fontWeight: "400",
    color: "#49454F",
  },
  controls: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  controlsButtonText: {
    fontSize: 13,
    fontWeight: "500",
    color: "rgba(244, 0, 0, 0.74)",
    textTransform: "uppercase",
  },
});

export default profileDataStyle;
