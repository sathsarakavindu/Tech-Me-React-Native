import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAuthToken = async () => {
  return await AsyncStorage.getItem("token");
};

export const setAuthToken = async (token_id: string) => {
  return await AsyncStorage.setItem("token", token_id);
};

export const removeAuthToken = async () => {
  return await AsyncStorage.removeItem("token");
};

export const setName = async (user_name: string) => {
  return await AsyncStorage.setItem("name", user_name);
};

export const getName = async () => {
  return await AsyncStorage.getItem("name");
};

export const removeName = async () => {
  return await AsyncStorage.removeItem("name");
};

export const setUserEmail = async (user_email: string) => {
  return await AsyncStorage.setItem("email", user_email);
};

export const getUserEmail = async () => {
  return await AsyncStorage.getItem("email");
};

export const removeUserEmail = async () => {
  return await AsyncStorage.removeItem("email");
};

export const setContactNo = async (user_contact_no: string) => {
  return await AsyncStorage.setItem("contact_no", user_contact_no);
};

export const getContactNo = async () => {
  return await AsyncStorage.getItem("contact_no");
};

export const removeContactNo = async () => {
  return await AsyncStorage.removeItem("contact_no");
};

export const setAccountType = async (account_type: string) => {
  return await AsyncStorage.setItem("account_type", account_type);
};

export const getAccountType = async () => {
  return await AsyncStorage.getItem("account_type");
};

export const removeAccountType = async () => {
  return await AsyncStorage.removeItem("account_type");
};

export const setNIC = async (nic: string) => {
  return await AsyncStorage.setItem("nic", nic);
};

export const getNIC = async () => {
  return await AsyncStorage.getItem("nic");
};

export const removeNIC = async () => {
  return await AsyncStorage.removeItem("nic");
};

export const setAddress = async (address: string) => {
  return await AsyncStorage.setItem("address", address);
};

export const getAddress = async () => {
  return await AsyncStorage.getItem("address");
};

export const removeAddress = async () => {
  return await AsyncStorage.removeItem("address");
};

export const setOTP = async (otp_code: string) => {
  return await AsyncStorage.setItem("otp", otp_code);
};

export const getOTP = async () => {
  return await AsyncStorage.getItem("otp");
};

export const removeOTP = async () => {
  return await AsyncStorage.removeItem("otp");
};

export const setIsGetHelp = async (otp_code: string) => {
  return await AsyncStorage.setItem("is_get_help", otp_code);
};

export const getIsGetHelp = async () => {
  return await AsyncStorage.getItem("is_get_help");
};

export const removeIsGetHelp = async () => {
  return await AsyncStorage.removeItem("is_get_help");
};
