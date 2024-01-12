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
  offers: {
    marginTop: 20,
    width: "100%",
    paddingBottom: 200,
  },
  offersItem: {
    width: "100%",
    paddingHorizontal: 8,
    marginBottom: 15,
  },
  offersItemImage: {
    width: "100%",
    borderRadius: 8,
  },
  containerContent: {
    paddingHorizontal: 16,
    marginTop: 20,

    paddingBottom: 220,
  },
  wrapper: {
    marginBottom: 30,
  },
  wrapperGap: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#B00020",
  },
  titleSecond: {
    fontSize: 14,
    fontWeight: "500",
    color: "#B00020",
  },
  desc: {
    fontSize: 14,
    fontWeight: "400",
    color: "#000000",
    letterSpacing: 0.25,
    lineHeight: 22,
  },
  descSecond: {
    fontSize: 14,
    fontWeight: "400",
    color: "#B00020",
    letterSpacing: 0.25,
    lineHeight: 22,
  },
  boldText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    borderColor: "rgba(244, 0, 0, 0.74)",
    borderWidth: 1,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(244, 0, 0, 0.74)",
    textTransform: "uppercase",
  },
  table: {
    flexDirection: "row",
    width: "100%",
  },
  tableColumn: (tab) => {
    return {
      flexDirection: "column",
      flex: 1 / tab,
      marginRight: 1,
    };
  },
  tableRow: (background = "#720608") => {
    return {
      paddingVertical: 22,
      backgroundColor: background,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 1,
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
});

export default profileOfferStyle;
