import { View } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";

const LocationIcon = () => {
  return (
    <Svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 2C6.0975 2 3.75 4.3475 3.75 7.25C3.75 11.1875 9 17 9 17C9 17 14.25 11.1875 14.25 7.25C14.25 4.3475 11.9025 2 9 2ZM9 9.125C7.965 9.125 7.125 8.285 7.125 7.25C7.125 6.215 7.965 5.375 9 5.375C10.035 5.375 10.875 6.215 10.875 7.25C10.875 8.285 10.035 9.125 9 9.125Z"
        fill="black"
        fillOpacity="0.87"
      />
    </Svg>
  );
};

export default LocationIcon;
