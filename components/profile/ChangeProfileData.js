import { View } from "react-native";
import styles from "../../style/profile/profile-data";
import ShowChangeDataComponent from "./ShowChangeDataComponent";
import ShowChangeAddressComponent from "./ShowChangeAddressComponent";

const ChangeProfileDataComponent = ({
  data,
  verifyFun,
  showChangeData,
  setShowChangeData,
  showChangeAddress,
  setShowChangeAddress,
  dataInput,
  setDataInput,
  deliveryInput,
  setDeliveryInput,
}) => {
  return (
    <>
      <View style={styles.positionWrapper(showChangeData || showChangeAddress)}>
        {showChangeData ? (
          <ShowChangeDataComponent
            data={data}
            verifyFun={verifyFun}
            showChangeData={showChangeData}
            setShowChangeData={setShowChangeData}
            dataInput={dataInput}
            setDataInput={setDataInput}
          />
        ) : (
          <></>
        )}

        {showChangeAddress ? (
          <ShowChangeAddressComponent
            data={data}
            verifyFun={verifyFun}
            showChangeAddress={showChangeAddress}
            setShowChangeAddress={setShowChangeAddress}
            deliveryInput={deliveryInput}
            setDeliveryInput={setDeliveryInput}
          />
        ) : (
          <></>
        )}
      </View>
    </>
  );
};

export default ChangeProfileDataComponent;
