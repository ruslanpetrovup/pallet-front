import { CommonActions } from "@react-navigation/native";

let navigationRef;

export const setNavigationRef = (ref) => {
  navigationRef = ref;
};

export const navigateToScreen = (screenName, params) => {
  navigationRef.dispatch(
    CommonActions.navigate({
      name: screenName,
      params,
    })
  );
};
