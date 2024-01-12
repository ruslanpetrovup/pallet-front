import { StyleSheet } from "react-native";

const buyoutStyle = StyleSheet.create({
  titleWrapper: {
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "500",
    color: "#49454F",
    padding: 16,
  },
  titleWrapperSecond: {
    paddingHorizontal: 12,
  },
  size: {
    marginTop: 18,
    paddingHorizontal: 12,
  },
  sizeItem: (active = false, last = false) => {
    return {
      width: "100%",
      height: 56,
      backgroundColor: active ? "#F1F1F1" : "#ffffff",
      borderRadius: 100,
      paddingHorizontal: 22,
      flexDirection: "row",
      alignItems: "center",
      borderBottomColor: "#CAC4D0",
      borderBottomWidth: last ? 1 : 0,
    };
  },
  sizeItemIcon: (active = false) => {
    return {
      width: 12,
      height: 12,
      marginRight: 18,
      backgroundColor: active ? "#272727" : "#B3B0AF",
      borderRadius: 100,
    };
  },
  sizeItemText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "400",
    maxWidth: 260,
  },
  titleSecondWrapper: {
    paddingHorizontal: 12,
  },
  titleSecond: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    color: "#49454F",
  },
  inputScoreWrapper: {
    paddingHorizontal: 12,
  },
  inputScore: (error = false) => {
    if (error) {
      return {
        paddingVertical: 20,
        paddingHorizontal: 50,
        borderColor: "#F40000",
        borderWidth: 1,
        borderRadius: 100,
        fontSize: 14,
        fontWeight: "600",
        color: "#000000",
      };
    } else {
      return {
        paddingVertical: 20,
        paddingHorizontal: 50,
        borderColor: "rgba(136,133,133,0.4)",
        borderWidth: 1,
        borderRadius: 100,
        fontSize: 14,
        fontWeight: "600",
        color: "#000000",
      };
    }
  },
  bannerBonusWrapper: {
    paddingHorizontal: 24,
    marginTop: 45,
  },
  bannerBonus: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#FEF7FF",
    elevation: 2,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  bannerBonusTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 7,
  },
  bannerBonusText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    marginBottom: 7,
  },
  bannerBonusScoreWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  bannerBonusScore: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    marginRight: 10,
    color: "#F40000",
  },
  bannerBonusScoreText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    marginRight: 10,
    color: "#F40000",
  },

  showFileWrapper: {
    paddingHorizontal: 40,
    marginTop: 15,
  },
  showFile: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
  },
  showFileBorder: {
    width: 18,
    height: 18,
    borderColor: "#272727",
    borderWidth: 2,
    borderRadius: 3,
  },
  showFileText: {
    marginLeft: 11,
    fontSize: 14,
    fontWeight: "500",
    color: "#49454F",
  },
  showFileDesc: {
    marginTop: 20,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "500",
    color: "#49454F",
    letterSpacing: 0.25,
    // maxWidth: 280,
    textAlign: "center",
  },
  fileInput: {
    alignItems: "center",
    marginTop: 15,
  },
  fileInputButton: {
    flexDirection: "row",
  },
  fileInputButtonText: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "400",
    marginLeft: 5,
  },
  fileInputAddress: {
    width: "100%",
    height: 46,
    borderColor: "#B3B0AF",
    borderWidth: 1,
    borderRadius: 10,
    color: "#272727",
    textAlign: "center",
    marginTop: 15,
  },
  acceptButtonWrapper: {
    paddingHorizontal: 8,
    marginTop: 50,
  },

  acceptButton: {
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,

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
  acceptButtonText: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
  },
});

export default buyoutStyle;
