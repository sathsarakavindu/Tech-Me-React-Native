import apiClient from "../api/apiClient";
import {
    AddVehicleURL,
    DeleteVehicleURL,
    EditVehicleURL,
    GetVehicleURL
} from "../api/domain_endpoints";

export const addVehicle = async (
  name: string,
  email: string,
  contact_no: string,
  nic: string,
  image_url: string,
  vehicle_no: string,
  type: string,
  model: string,
  color: string
) => {
  try {
    const response = await apiClient.post(AddVehicleURL, {
      name,
      email,
      contact_no,
      nic,
      image_url,
      vehicle_no,
      type,
      model,
      color
    });
    if (response) {
    }
  } catch (error) {
    console.log(`The error is in addVehicleError: ${error}`);
  }
};

const getVehicles = async (nic: string) => {
  try {
    const response = await apiClient.get(GetVehicleURL, {
      params: {
        nic: nic
      }
    });

    if (response) {
    }
  } catch (error) {
    console.log(`The error is in getVehicles: ${error}`);
  }
};

const updateVehicle = async (
  nic: string,
  image_url: string,
  vehicle_no: string,
  type: string,
  model: string,
  color: string
) => {
  try {
    const response = await apiClient.put(EditVehicleURL, {
      nic,
      image_url,
      vehicle_no,
      type,
      model,
      color
    });
    if (response) {
    }
  } catch (error) {
    console.log(`The error is in updateVehicle: ${error}`);
  }
};

const deleteVehicle = async (nic: string, vehicle_no: string) => {
  try {
    const response = await apiClient.delete(DeleteVehicleURL, {});
  } catch (error) {
    console.log(`The error is in deleteVehicle: ${error}`);
  }
};
