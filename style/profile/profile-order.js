import { StyleSheet } from "react-native";

const profileOrderStyle = StyleSheet.create({
  back: {
    paddingTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    width: "100%",
  },
  backText: {
    fontSize: 22,
    fontWeight: "600",
  },
  orders: (padding = 8) => {
    return {
      paddingHorizontal: padding,
      marginTop: 20,
    };
  },
  ordersWrapper: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.14,
    shadowRadius: 1,
    elevation: 2,
    borderRadius: 4,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  ordersWrapperInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ordersWrapperInfoBlock: {
    flexDirection: "row",
  },
  ordersWrapperInfoNumber: {
    fontSize: 13,
    fontWeight: "700",
    color: "#272727",
    marginRight: 10,
  },
  ordersWrapperInfoDate: {
    fontSize: 11,
    fontWeight: "700",
    color: "rgba(1, 1, 1, 0.6)",
  },
  ordersWrapperInfoButton: {
    width: 27,
    height: 27,
    borderRadius: 50,
    backgroundColor: "#EEEEEE",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "-90deg" }],
  },
  ordersWrapperStatus: (color = "#FFB21D") => {
    return {
      fontSize: 13,
      fontWeight: "700",
      color: color,
      marginBottom: 8,
    };
  },
  orderWrapperItem: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 10,
  },
  orderWrapperItemGap: {
    flexDirection: "column",
  },
  orderWrapperItemImage: {
    width: 66,
    height: 68,
    marginRight: 12,
  },
  orderWrapperItemInfo: {
    width: "75%",
  },
  orderWrapperItemInfoTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#272727",
    maxWidth: 172,
    marginBottom: 4,
  },
  orderWrapperItemInfoBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderWrapperItemInfoBlockText: {
    fontSize: 13,
    fontWeight: "400",
    color: "#272727",
  },
  orderWrapperItemInfoBlockScore: (status = false) => {
    return {
      fontSize: 13,
      fontWeight: "400",
      color: status ? "#27AA80" : "#272727",
    };
  },
  orderDetailsButtonWrapper: {
    paddingHorizontal: 8,
    marginTop: 20,
  },
  orderDetailsButton: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 16,
    borderColor: "rgba(244, 0, 0, 0.74)",
    borderWidth: 1,
    borderRadius: 4,
  },
  orderDetailsButtonSecond: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 16,
  },
  orderDetailsButtonText: {
    fontSize: 13,
    fontWeight: "500",
    color: "rgba(244, 0, 0, 0.74)",
    textTransform: "uppercase",
  },
  details: {
    marginTop: 10,
  },
  detailsItem: {
    paddingVertical: 10,
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  detailsItemSecond: {
    paddingVertical: 10,
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  detailsItemTitle: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    color: "#272727",
  },
  detailsItemScore: {
    fontSize: 12,
    fontWeight: "400",
    color: "#272727",
  },
});

export default profileOrderStyle;
