import { StyleSheet } from "react-native";

const profileStyle = StyleSheet.create({
  logo: {
    width: "100%",
    paddingTop: 50,
    paddingBottom: 10,
  },
  info: {
    width: "100%",
    height: 73,
    backgroundColor: "#FEF7FF",
    alignItems: "center",
    paddingHorizontal: 16,
    flexDirection: "row",
  },
  infoImg: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "#272727",
  },
  menu: {
    flexDirection: "column",
    borderTopColor: "#E1E1E1",
    borderTopWidth: 1,
    borderBottomColor: "#E1E1E1",
    borderBottomWidth: 1,
  },
  menuItem: {
    paddingHorizontal: 16,
    width: "100%",
    height: 48,
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemImg: {
    width: 25,
    marginRight: 30,
    alignItems: "center",
  },
  menuItemImage: {
    width: "100%",
  },
  menuItemText: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "600",
    color: "rgba(0, 0, 0, 0.6)",
  },
  menuItemTextImportant: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "600",
    color: "#F40000",
  },
});

export default profileStyle;
