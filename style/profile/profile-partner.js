import { StyleSheet } from "react-native";

const profilePartnerStyle = StyleSheet.create({
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
  content: {
    marginTop: 20,
    paddingBottom: 150,
  },
  wrapper: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
    color: "#B00020",
    letterSpacing: 0.25,
  },
  desc: {
    fontSize: 15,
    fontWeight: "400",
    marginTop: 5,
    color: "#272727",
  },
});

export default profilePartnerStyle;
