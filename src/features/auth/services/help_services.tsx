import apiClient from "../api/apiClient";
import { MakeHelp } from "../api/domain_endpoints";

export const makeHelpRequestHandling = async (
  user_name: String,
  email: String,
  vehicle_image: String,
  vehicle_no: String,
  model: String,
  type: String,
  color: String,
  nic: String,
  contact_no: String,
  address: String,
  latitude: number,
  longitude: number
) => {
  try {
    const response = await apiClient.post(MakeHelp, {
      user_name,
      email,
      vehicle_image,
      vehicle_no,
      model,
      type,
      color,
      nic,
      contact_no,
      address,
      latitude,
      longitude
    });

    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    console.log(`The error is in makeHelpRequest: ${error}`);
  }
};

