import Svg, { Path, Rect } from "react-native-svg";

const CatalogPlus = () => {
  return (
    <Svg
      width="35"
      height="35"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect width="25" height="25" rx="12.5" fill="#272727" />
      <Path
        d="M16.457 12.1357V13.665H7.68555V12.1357H16.457ZM12.8887 8.40039V17.7168H11.2627V8.40039H12.8887Z"
        fill="white"
      />
    </Svg>
  );
};

export default CatalogPlus;
