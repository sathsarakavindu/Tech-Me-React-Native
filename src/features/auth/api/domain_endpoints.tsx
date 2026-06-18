export const domain = "https://techmebackend-production.up.railway.app";

// User Authentication APIs
export const LoginURL = "/api/users/signin/";
export const RegisterURL = "/api/users/register/";
export const SentOPTtoUser = "/api/users/forgot-password/";
export const CheckOTPValidation = "/api/users/check-otp/";
export const ChangePassword = "/api/users/change-password/";
export const ForgotPasswordUpdate = "/api/users/update-forgot-password/";
export const UpdateUser = "/api/users/update/";
export const DeleteUser = "/api/users/delete/";

// Vehicle APIs
export const AddVehicleURL = "/api/vehicle/add-vehicle/";
export const GetVehicleURL = "/api/vehicle/get-vehicle/";
export const EditVehicleURL = "/api/vehicle/edit-vehicle/";
export const DeleteVehicleURL = "/api/vehicle/delete-vehicle/";

//Help APIs
export const MakeHelp = "/api/users/help/make-help/";
export const CanelHelp = "/api/users/help/cancel-help/";
export const ApproveHelp = "/api/users/help/approve-help/";
export const NotApproveHelp = "/api/users/help/not-approve-help/";
export const GetMadeHelps = "/api/users/help/get-helps/";
export const GetUserHelps = "/api/users/help/user/:email";
export const GetHelpByID = "/api/users/help/:help_id";

//Technician Approval APIs
export const TechnicianApproveHelp = "/api/users/approval-help/";
export const TechnicianRemoveApprovalHelp =
  "/api/users/approval-help/remove-approval-help/";
