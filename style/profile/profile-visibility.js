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
  catalogContainer: {
    width: "100%",
    paddingTop: 20,
    backgroundColor: "#ffffff",
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  catalogItem: {
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
    flexDirection: "row",
    marginBottom: 16,
  },
  catalogImage: {
    width: "40%",
    maxHeight: 100,
    marginRight: 16,
  },
  catalogImg: {
    width: "100%",
    height: "100%",
  },
  catalogContent: {
    width: "60%",
  },
  catalogTitle: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "700",
    marginBottom: 5,
  },
  catalogDesc: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "400",
  },
  catalogBasket: {
    marginLeft: "auto",
    marginRight: 10,
    marginTop: 10,
  },
});

export default profileOrderStyle;
