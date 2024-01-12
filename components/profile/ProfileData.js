import styles from "../../style/profile/profile-data";
import { View, Text } from "react-native";

const ProfileDataComponent = ({ data }) => {
  return (
    <View style={styles.wrapperBlock}>
      <View style={styles.wrapper}>
        <Text style={styles.wrapperHead}>Ім’я </Text>
        <Text style={styles.wrapperSecond}>
          {data?.lastName ? data?.lastName : ""}{" "}
          {data?.firstName ? data?.firstName : ""}
        </Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.wrapperHead}>Дата народження</Text>
        <Text style={styles.wrapperSecond}>
          {data?.birthday === "" ? "дд-мм-рррр" : data?.birthday}
        </Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.wrapperHead}>Електронна адреса </Text>
        <Text style={styles.wrapperSecond}>
          {data?.email ? data?.email : ""}
        </Text>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.wrapperHead}>Номер телефону </Text>
        <Text style={styles.wrapperSecond}>
          {data?.phone ? data?.phone : ""}
        </Text>
      </View>
    </View>
  );
};

export default ProfileDataComponent;
