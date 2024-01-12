import { StyleSheet } from "react-native";

const registerStyle = StyleSheet.create({
  register: {
    paddingTop: 50,
    width: "100%",
  },
  back: {
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    fontSize: 22,
    fontWeight: "600",
  },
  title: {
    paddingHorizontal: 8,
    paddingBottom: 10,
  },
  titleText: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "500",
  },
  buttons: {
    width: "100%",
    marginTop: 20,
    flexDirection: "row",

    paddingHorizontal: 8,
    marginRight: 0,
  },
  button: {
    paddingVertical: 14,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#F1F1F1",
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 5,
  },
  buttonText: {
    fontSize: 15,
    lineHeight: 16,
    fontWeight: "500",
    color: "#272727",
    textTransform: "uppercase",
  },
  buttonTextActive: {
    fontSize: 15,
    lineHeight: 16,
    fontWeight: "500",
    color: "#272727",
    textTransform: "uppercase",
  },
  buttonActive: (loginButtons) => {
    return {
      paddingVertical: 14,
      width: loginButtons / 2 - 13,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F1F1F1",
      borderRadius: 4,
    };
  },
  form: {
    paddingBottom: 40,
  },
  formContainer: {
    marginTop: 30,
    paddingHorizontal: 8,
  },
  formWrapper: {
    position: "relative",
    marginBottom: 25,
  },
  placeholder: {
    paddingHorizontal: 4,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: "rgba(0, 0, 0, 0.6)",
    backgroundColor: "white",
    position: "absolute",
    top: -8,
    left: 9,
    zIndex: 2,
  },
  input: (error = false) => {
    return {
      paddingVertical: 20,
      paddingLeft: 16,
      borderColor: error ? "#B00020" : "#B3B0AF",
      borderWidth: error ? 2 : 1.5,
      borderRadius: 4,
    };
  },
  formErrorMessage: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "400",
    color: "#B00020",
    marginTop: 5,
    marginLeft: 10,
  },
  inputWarning: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "400",
    color: "rgba(0, 0, 0, 0.6)",
    marginLeft: 16,
    marginBottom: 20,
  },
  submit: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "#272727",
    paddingVertical: 16,
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
  submitText: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "600",
    color: "white",
    textTransform: "uppercase",
  },
  text: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "400",
    color: "rgba(0, 0, 0, 0.74)",
    textAlign: "center",
    marginBottom: 10,
  },
  textError: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "400",
    color: "rgba(176, 0, 32, 1)",
    textAlign: "left",
    marginBottom: 10,
  },
  linkText: {
    fontSize: 10,
    lineHeight: 15,
    fontWeight: "400",
    color: "rgba(244, 0, 0, 0.6)",
    textAlign: "center",
    textDecorationLine: "underline",
    textDecorationColor: "rgba(244, 0, 0, 0.6)",
    margin: 0,
  },

  acceptBack: {
    flexDirection: "row",

    alignItems: "center",
    paddingHorizontal: 16,
    width: "100%",
  },
  acceptBackText: {
    fontSize: 19,
    fontWeight: "600",
  },
  acceptTitle: {
    fontSize: 18,
    textAlign: "center",
  },
  acceptPhoneWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 30,
    paddingBottom: 30,
  },
  acceptPhoneInput: (error = false) => {
    return {
      flex: 0.15,
      paddingVertical: 15,
      borderColor: error ? "#B00020" : "#B3B0AF",
      borderWidth: error ? 2 : 1.5,
      borderRadius: 4,
      textAlign: "center",
      fontSize: 19,
    };
  },
  acceptAgainCode: {
    marginTop: 30,
  },
  acceptAgainCodeText: {
    textAlign: "center",
    color: "#B00020",
  },

  acceptAgainCodeWrapper: {
    backgroundColor: "#363636",
    width: "100%",
    height: 150,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 15,
  },
  acceptAgainCodeModal: (score = 150) => {
    return {
      position: "absolute",
      left: 0,
      bottom: 0,
      width: "100%",
      height: 150,

      transform: [{ translateY: score }],
    };
  },

  acceptAgainCodeButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "white",
    paddingVertical: 16,
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
  acceptAgainCodeButtonText: {
    color: "#363636",
    fontWeight: "700",
  },
  changePasswordText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#363636",
    marginTop: 15,
    textAlign: "center",
  },
});

export default registerStyle;
