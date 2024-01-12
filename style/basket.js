import { StyleSheet } from "react-native";

const basketStyle = StyleSheet.create({
  basket: {
    backgroundColor: "#ffffff",
  },
  basketTitle: {
    width: "100%",
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 8,
  },
  basketTitleText: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "500",
  },
  scrollView: {
    paddingBottom: 210,
    paddingHorizontal: 8,
  },
  basketList: {
    width: "100%",
    marginTop: 20,
  },
  basketItem: {
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
    padding: 12,
    paddingRight: 16,
    paddingVertical: 25,
    paddingTop: 50,
    flexDirection: "row",
    position: "relative",

    marginBottom: 16,
  },
  basketImage: {
    width: "40%",
    marginRight: 14,
  },
  basketContent: {
    width: "60%",
  },
  basketContentTitle: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "700",
    marginBottom: 5,
  },
  basketContentDesc: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "400",
  },
  basketContentClose: {
    position: "absolute",
    top: 10,
    right: 4,
  },

  basketContentBonus: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10,
    marginTop: 5,
  },
  basketContentBonusBlock: {
    flexDirection: "row",
  },
  basketContentBonusScore: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "700",
    color: "#F40000",
  },
  basketContentBonusText: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "400",
    color: "#F40000",
  },
  basketContentBonusInput: {
    width: 100,
    height: 27,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#EEEEEE",
    borderRadius: 50,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "600",
  },

  basketButtonBack: {
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#272727",
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 20,
  },
  basketButtonBackText: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "500",
    color: "#717171",
  },
  basketButtonOrder: {
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
  basketButtonOrderText: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  basketNull: {
    alignItems: "center",
    marginTop: 30,
  },
  basketNullTitle: {
    fontSize: 22,
    lineHeight: 23,
    fontWeight: "700",
    marginTop: 30,
    color: "#272727",
  },
  basketNullDesc: {
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "400",
    marginTop: 6,
    color: "rgba(244, 0, 0, 0.74)",
  },
});

export default basketStyle;
