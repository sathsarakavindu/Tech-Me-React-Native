import { Vehicle } from "@/models/vehicle_model";
import apiClient from "../api/apiClient";
import {
  AddVehicleURL,
  DeleteVehicleURL,
  EditVehicleURL,
  GetVehicleURL,
  IsAvailableThisVehicle
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

export const getVehicles = async (nic: string): Promise<Vehicle[]> => {
  try {
    const response = await apiClient.get(GetVehicleURL, {
      params: {
        nic: nic
      }
    });

    return response.data.result ?? [];
  } catch (error) {
    console.log(`The error is in getVehicles: ${error}`);
    return [];
  }
};

export const updateVehicle = async (
  _id: string,
  vehicle_no: string,
  type: string,
  model: string,
  color: string
) => {
  try {
    _id;
    const response = await apiClient.put(EditVehicleURL, {
      _id,
      vehicle_no,
      type,
      model,
      color
    });
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.log(`The error is in updateVehicle: ${error}`);
  }
};

export const deleteVehicle = async (vehicleNo: string) => {
  try {
    const response = await apiClient.delete(DeleteVehicleURL, {
      params: {
        vehicle_no: vehicleNo
      }
    });

    if (response.status == 200) {
      return true;
    } else return false;
  } catch (error) {
    console.log(`The error is in deleteVehicle: ${error}`);
    return false;
  }
};

export const isAvailableThisVehicle = async (vehicle_no: string) => {
  try {
    const response = await apiClient.get(IsAvailableThisVehicle, {
      params: { vehicle_no: vehicle_no }
    });
    const message = response.data.message;
    if (message) {
      console.log(`Available`);
      return true;
    } else {
      console.log("Not available");
      return false;
    }
  } catch (error) {}
};
