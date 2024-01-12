import { StyleSheet } from "react-native";
import basket from "./basket";

const orderStyle = StyleSheet.create({
  ...basket,
  back: {
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    width: "100%",
    paddingVertical: 14,
  },
  backText: {
    fontSize: 22,
    fontWeight: "600",
  },
  scrollView: {
    paddingBottom: 30,
    paddingTop: 10,
  },
  basketList: {
    paddingHorizontal: 8,
    marginTop: 0,
  },
  title: {
    width: "100%",
    paddingHorizontal: 8,
    marginTop: 20,
  },
  titleText: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "500",
    color: "#272727",
  },
  acceptButtonWrapper: {
    paddingHorizontal: 8,
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
  text: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "400",
    color: "rgba(0, 0, 0, 0.74)",
    textAlign: "center",
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
    maxWidth: 261,
    margin: 0,
  },
  cityButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#E1E1E1",
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 9,
    paddingLeft: 15,
    paddingRight: 18,
  },
  cityButtonWrapper: {
    paddingHorizontal: 8,
    marginTop: 20,
  },
  cityButtonInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  cityButtonInfoIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },
  cityButtonInfoContent: {},
  cityButtonInfoContentText: {
    fontSize: 9,
    lineHeight: 16,
    fontWeight: "400",
    textTransform: "uppercase",
    color: "rgba(0, 0, 0, 0.6)",
  },
  cityButtonInfoContentCity: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
    color: "rgba(0, 0, 0, 0.6)",
  },
  cityButtonArrow: {
    transform: [{ rotate: "180deg" }],
    opacity: 0.3,
  },
  selectDeliveryWrapper: {
    paddingHorizontal: 8,
    marginTop: 20,
  },
  selectDelivery: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: "#ffffff",
    borderColor: "#E1E1E1",
    borderWidth: 1,
    borderRadius: 5,
  },
  selectDeliveryTitle: {
    fontSize: 9,
    lineHeight: 16,
    color: "rgba(0, 0, 0, 0.6)",
    textTransform: "uppercase",
    fontWeight: "400",
  },
  selectDeliveryContent: {
    flexDirection: "column",
    marginTop: 20,
  },
  selectDeliveryItem: {
    flexDirection: "row",
    marginBottom: 20,
  },
  selectDeliveryItemRadio: (active = false) => {
    return {
      borderColor: active ? "rgba(244, 0, 0, 0.74)" : "#E1E1E1",
      borderWidth: 2,
      borderRadius: 100,
      width: 20,
      height: 20,
      padding: 3,
      marginRight: 22,
    };
  },
  selectDeliveryItemRadioMarker: (active = false) => {
    return {
      backgroundColor: active ? "rgba(244, 0, 0, 0.74)" : "white",
      width: 10,
      height: 10,
      borderRadius: 100,
    };
  },
  selectDeliveryItemTitle: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "400",
    color: "rgba(39, 39, 39, 1)",
  },
  selectNextWrapper: {
    paddingHorizontal: 8,
    marginTop: 30,
  },
  selectNext: {
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
  selectNextText: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    textTransform: "uppercase",
  },

  selectCityWrapper: {
    marginTop: 20,
  },

  selectCity: {
    paddingHorizontal: 8,
  },

  selectCityItem: {
    paddingHorizontal: 40,
    justifyContent: "center",
    height: 45,
  },

  selectCityItemActive: {
    paddingHorizontal: 10,
    height: 45,
  },

  selectCityItemText: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "600",
    color: "rgba(0, 0, 0, 0.6)",
  },

  searchAddress: {
    width: "100%",
    height: 55,
    paddingHorizontal: 12,
    borderTopColor: "#E1E1E1",
    borderTopWidth: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  searchAddressIcon: {
    marginRight: 12,
  },
  selectAdressWrapper: {
    borderTopColor: "#E1E1E1",
    borderTopWidth: 1,
  },
  selectAdress: {
    paddingBottom: 300,
  },
  selectAdressItem: {
    width: "100%",
    height: 86,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  selectAdressItemIcon: {
    marginRight: 15,
  },
  selectAdressItemContent: {
    flexDirection: "column",
  },
  selectAdressItemContentText: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "400",
    marginBottom: 2,
    color: "rgba(0, 0, 0, 0.6)",
    maxWidth: "95%",
  },
  selectAdressItemContentAddress: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "400",
    marginBottom: 2,
    color: "#272727",
    // maxWidth: "95%",
  },
  selectAdressItemContentDay: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "400",
    color: "rgba(0, 0, 0, 0.6)",
    // maxWidth: "90%",
  },
  dateCurrent: {
    width: "100%",
    borderBottomColor: "#E1E1E1",
    borderBottomWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginTop: 20,
  },
  dateCurrentText: {
    fontSize: 24,
    lineHeight: 40,
    fontWeight: "400",
    color: "#1D1B20",
  },
  finallyWrapper: {
    paddingHorizontal: 8,
    paddingTop: 60,
  },
  finally: {
    borderRadius: 10,
    overflow: "hidden",
    width: "100%",
    height: 185,
  },
  finallyImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  finallyText: {
    fontSize: 22,
    lineHeight: 22,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 1)",
  },
  messageFinally: {
    width: "100%",
    paddingHorizontal: 22,
    marginTop: 20,
  },
  messageFinallyTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#272727",
    textAlign: "center",
    marginBottom: 10,
  },
  messageFinallyText: {
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "400",
    color: "rgba(77, 77, 77, 1)",
    textAlign: "center",
  },
  orderFinallyWrapper: {
    width: "100%",
    paddingHorizontal: 8,
    marginTop: 30,
  },
  orderFinally: {
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 4,
    backgroundColor: "#FFF6E5",
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  orderFinallyBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  orderFinallyNumber: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "700",
    color: "#272727",
  },
  orderFinallyDate: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "700",
    color: "rgba(1, 1, 1, 0.6)",
  },
  orderFinallyNotification: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  orderFinallyNotificationText: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "700",
    color: "#272727",
  },
  orderFinallyProductsBlock: {
    marginTop: 20,
  },
  orderFinallyProducts: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  orderFinallyProductsTitle: {
    maxWidth: 200,
  },
  orderButtonsWrapper: {
    paddingHorizontal: 8,
    marginTop: 50,
  },
  orderButtonGoOrders: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  orderButtonText: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "500",
    textTransform: "uppercase",
    color: "rgba(244, 0, 0, 0.74)",
  },
  orderButtonGoCatalog: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(244, 0, 0, 0.74)",
    borderWidth: 1,
    borderRadius: 4,
  },
});

export default orderStyle;
