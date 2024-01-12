import { useNavigation } from "@react-navigation/native";
import useVerify from "./hook/useVerify";

const PrivateRouter = (Component) => {
  const navigation = useNavigation();
  //   const { verify, dataFetch } = await useVerify();

  //   const verify = false;
  //   if (!verify) {
  //     navigation.navigate("login");
  //     return Component;
  //   }

  return Component;
};

export default PrivateRouter;
