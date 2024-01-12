import { StyleSheet } from "react-native";

const bonusStyle = StyleSheet.create({
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
  bonusScore: {
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 8,
  },
  bonusScoreBackground: {
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 5,
  },
  bonusScoreBackgroundBlock: {
    alignItems: "center",
    paddingBottom: 7,
    paddingTop: 27,
  },
  bonusScoreSum: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 3,
    color: "#F40000",
  },
  bonusScoreSumText: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 20,
    color: "#F40000",
  },
  bonusScoreSumWarning: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: "700",

    color: "rgba(255, 255, 255, 0.8)",
  },
  bonusHistory: {
    paddingHorizontal: 8,
    marginTop: 20,
    paddingBottom: 120,
  },
  bonusHistoryItem: (color = "default") => {
    const styleItem = (background) => {
      return {
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.14,
        shadowRadius: 1,
        borderRadius: 4,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: background,
        marginBottom: 10,
      };
    };
    if (color === "default") {
      return styleItem("#ffffff");
    } else if (color === "referral") {
      return styleItem("#FAF6FF");
    } else if (color === "delivery") {
      return styleItem("#F4FCFF");
    } else if (color === "order") {
      return styleItem("#FEF2F2");
    }
  },
  bonusHistoryItemBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  bonusHistoryItemTitle: (color = "default") => {
    const styleTitle = (col) => {
      return {
        fontSize: 13,
        fontWeight: "700",
        color: col,
      };
    };

    if (color === "default") {
      return styleTitle("#B00020");
    } else if (color === "referral") {
      return styleTitle("#2B009B");
    } else if (color === "delivery") {
      return styleTitle("#2B009B");
    } else if (color === "order") {
      return styleTitle("#F40000");
    }
  },
  bonusHistoryItemDate: {
    fontSize: 13,
    fontWeight: "700",
    color: "rgba(1, 1, 1, 0.6)",
  },
  bonusHistoryItemOrder: (color = "default") => {
    const styleTitle = (col) => {
      return {
        fontSize: 16,
        fontWeight: "800",
        color: col,
      };
    };

    if (color === "default") {
      return styleTitle("#B00020");
    } else if (color === "referral") {
      return styleTitle("#2B009B");
    } else if (color === "delivery") {
      return styleTitle("#2B009B");
    } else if (color === "order") {
      return styleTitle("#F40000");
    } else {
      return styleTitle("#B00020");
    }
  },
  bonusHistoryItemSum: (color = "minus") => {
    const styleSum = (col) => {
      return {
        fontSize: 13,
        fontWeight: "700",
        color: col,
        textAlign: "right",
      };
    };
    if (color === "minus") {
      return styleSum("#353535");
    } else if (color === "plus") {
      return styleSum("#F40000");
    } else {
      return styleSum("#353535");
    }
  },
});

export default bonusStyle;
