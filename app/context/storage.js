import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "./AuthContext";
const key = "User";
export const storeUser = async (user) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(user));
  } catch (error) {
    alert(error.message);
  }
};
export const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    alert(error.message);
  }
};
export const deleteUser = async () => {
  try {
    const a = await AsyncStorage.removeItem(key);
    console.log(key);
    console.log(a);
  } catch (error) {
    alert(error.message);
  }
};
