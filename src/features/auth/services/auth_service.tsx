import apiClient from "../api/apiClient";
import {
  ChangePassword,
  CheckOTPValidation,
  DeleteUser,
  ForgotPasswordUpdate,
  LoginURL,
  RegisterURL,
  SentOPTtoUser,
  UpdateUser
} from "../api/domain_endpoints";

import { User } from "@/models/user_model";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await apiClient.post(LoginURL, {
      email,
      password
    });

    return response.data;
  } catch (error) {
    console.log(`The error is in loginUser ${error}`);
    throw error;
  }
};

export const createUser = async (user: User) => {
  try {
    const response = await apiClient.post(RegisterURL, user);
    return response.data;
  } catch (error) {
    console.log(`The error is in createUser ${error}`);
    throw error;
  }
};

export const sendOTPToUser = async (registered_email: string) => {
  try {
    const response = await apiClient.post(SentOPTtoUser, {
      registered_email
    });
    return response.data;
  } catch (error) {
    console.log(`The error is in SentOPTtoUser ${error}`);
    throw error;
  }
};

export const checkOTPValidation = async (sent_otp: string) => {
  try {
    const response = await apiClient.post(CheckOTPValidation, {
      sent_otp
    });

    return response.data;
  } catch (error) {
    console.log(`The error is in checkOTPValidation ${error}`);
    throw error;
  }
};

export const changePassword = async (
  user_email: string,
  current_password: string,
  new_password: string
) => {
  try {
    const response = await apiClient.post(ChangePassword, {
      user_email,
      current_password,
      new_password
    });
    return response.data;
  } catch (error) {
    console.log(`The error is in changePassword ${error}`);
    throw error;
  }
};

export const forgotPasswordUpdate = async (
  new_password: string,
  otp: string
) => {
  try {
    const response = await apiClient.post(ForgotPasswordUpdate, {
      new_password,
      otp
    });

    return response.data;
  } catch (error) {
    console.log(`The error is in forgotPasswordUpdate ${error}`);
    throw error;
  }
};

export const updateUserDetails = async (updateValue: any) => {
  try {
    const response = await apiClient.post(UpdateUser, { updateValue });

    return response.data;
  } catch (error) {
    console.log(`The error is in updateUserDetails ${error}`);
    throw error;
  }
};

export const deleteUser = async (deleteValue: string) => {
  try {
    const response = await apiClient.delete(DeleteUser);
    return response.data;
  } catch (error) {
    console.log(`The error is in deleteUser ${error}`);
    throw error;
  }
};
