import Swiper from "react-native-swiper";
import Home from "./home";
import Bonus from "./bonus";
import Basket from "./basket";
import Profile from "./profile";
import { useState } from "react";
import Navigation from "../components/Navigation";
import { useEffect } from "react";

const Test = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentNavigationName = () => {
    const names = ["home", "bonus", "shop", "profile"];

    return names[currentIndex];
  };

  return (
    <>
      <Swiper
        showsPagination={false}
        loop={false}
        onIndexChanged={(index) => {
          setCurrentIndex(index);
          console.log(index);
        }}
      >
        <Home />
        <Bonus refresh={currentIndex === 1 ? true : false} />
        <Basket refresh={currentIndex === 2 ? true : false} />
        <Profile />
      </Swiper>
      <Navigation active={currentNavigationName()} />
    </>
  );
};

export default Test;
