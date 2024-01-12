import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER } from "@env";

import axios from "axios";

const useVerify = async () => {
  console.log(SERVER);
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    return {
      verify: false,
      dataFetch: {},
    };
  }

  if (token === "") {
    return {
      verify: false,
      dataFetch: {},
    };
  }

  const result = await axios.post(`${SERVER}/auth/verify`, {
    token: token,
  });

  if (result.data.code !== 200) {
    return {
      verify: false,
      dataFetch: {},
    };
  }

  return {
    verify: true,
    dataFetch: result.data.body,
  };
};

export default useVerify;
