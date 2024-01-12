import { StyleSheet } from "react-native";

const catalogItemStyle = StyleSheet.create({
  catalog: {
    backgroundColor: "#ffffff",
  },
  back: {
    width: "100%",
    paddingTop: 50,
  },
  sliderContainer: {
    width: "100%",
    height: 188,
    marginTop: 10,
  },
  sliderPagination: {
    position: "absolute",
    bottom: -20,
  },
  sliderActiveDot: {
    width: 13,
    height: 6,
    backgroundColor: "#272727",
  },
  sliderItem: {
    width: "100%",
    height: "100%",
  },
  catalogTitle: {
    fontSize: 16,
    lineHeight: 16,
    fontWeight: "700",
    color: "#272727",
  },
  catalogTitleSub: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "400",
    color: "#272727",
  },
  catalogIndex: {
    fontSize: 12,
    lineHeight: 24,
    fontWeight: "700",
    color: "#272727",
    marginTop: 16,
  },
  catalogText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "400",
    color: "#272727",
  },
  basketGo: (active = false) => {
    return {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      borderRadius: 4,
      backgroundColor: active ? "#F40000" : "#272727",
      paddingBottom: 12,
      paddingTop: 16,
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
    };
  },
  basketGoText: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "500",
    color: "white",
    marginLeft: 12,
  },
});

export default catalogItemStyle;
