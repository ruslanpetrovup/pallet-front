import { StyleSheet } from "react-native";

const profileOfferStyle = StyleSheet.create({
  back: {
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    width: "100%",
  },
  backText: {
    fontSize: 22,
    fontWeight: "600",
  },
  menu: {
    marginTop: 20,
    paddingBottom: 220,
  },
  menuItem: {
    width: "100%",
    height: 48,
    paddingLeft: 16,
    paddingRight: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#E1E1E1",
    borderBottomWidth: 1,
  },
  menuItemTitle: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "600",
    color: "rgba(0, 0, 0, 0.6)",
  },
  menuItemIcon: {
    transform: [{ rotate: "180deg" }],
  },
  content: {
    marginTop: 20,
    paddingBottom: 220,
  },
  wrapper: {
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: "500",
    color: "#272727",
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  desc: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "400",
    letterSpacing: 0.25,
    color: "#272727",
    paddingHorizontal: 16,
  },
  titleSecond: {
    fontSize: 12,
    lineHeight: 20,
    fontWeight: "700",
    color: "#272727",
    textTransform: "uppercase",
    marginBottom: 5,
    paddingHorizontal: 16,
  },
  table: {
    flexDirection: "row",
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 16,
  },
  tableColumn: (tab) => {
    return {
      flexDirection: "column",
      justifyContent: "center",
      flex: 1 / tab,
    };
  },
  tableRow: (background = "#720608") => {
    return {
      paddingVertical: 22,
      justifyContent: "center",
      alignItems: "center",
    };
  },
  tableText: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 17,
    color: "#FFFFFF",
    maxWidth: 57,
    textAlign: "center",
  },

  officeBlock: {
    marginBottom: 30,
  },

  officeTitle: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: "500",
    color: "#272727",
    marginBottom: 5,
    paddingHorizontal: 16,
  },

  officeTitleSecond: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "600",
    letterSpacing: 0.25,
    color: "#272727",
    paddingHorizontal: 16,
    marginBottom: 5,
  },
  list: {
    marginBottom: 20,
    paddingHorizontal: 16,
    flexDirection: "column",
  },
  item: {
    position: "relative",
    marginBottom: 5,
  },
  itemDecore: (decore = true) => {
    if (decore) {
      return {
        position: "absolute",
        top: 10,
        left: 0,
        width: 5,
        height: 5,
        borderRadius: 100,
        backgroundColor: "#272727",
      };
    } else {
      return {
        position: "absolute",
        top: 10,
        left: 0,
        width: 5,
        height: 5,
      };
    }
  },
  itemText: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "400",
    letterSpacing: 0.25,
    color: "#272727",
    marginLeft: 20,
  },
  link: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "400",
    textDecorationLine: "underline",
  },
});

export default profileOfferStyle;
