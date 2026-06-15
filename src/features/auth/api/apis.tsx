const domain = "https://techmebackend-production.up.railway.app";

// User Authentication APIs
const LoginURL = domain + "/api/users/signin/";
const RegisterURL = domain + "/api/users/register/";
const SentOPTtoUser = domain + "/api/users/forgot-password/";
const CheckOTPValidation = domain + "/api/users/check-otp/";
const ChangePassword = domain + "/api/users/change-password/";
const ForgotPasswordUpdate = domain + "/api/users/update-forgot-password/";
const UpdateUser = domain + "/api/users/update/";
const DeleteUser = domain + "/api/users/delete/";

// Vehicle APIs
const AddVehicleURL = domain + "/api/vehicle/add-vehicle/";
const GetVehicleURL = domain + "/api/vehicle/get-vehicle/";
const EditVehicleURL = domain + "/api/vehicle/edit-vehicle/";
const DeleteVehicleURL = domain + "/api/vehicle/delete-vehicle/";

//Help APIs
const MakeHelp = domain + "/api/users/help/make-help/";
const CanelHelp = domain + "/api/users/help/cancel-help/";
const ApproveHelp = domain + "/api/users/help/approve-help/";
const NotApproveHelp = domain + "/api/users/help/not-approve-help/";
const GetMadeHelps = domain + "/api/users/help/get-helps/";
const GetUserHelps = domain + "/api/users/help/user/:email";
const GetHelpByID = domain + "/api/users/help/:help_id";

//Technician Approval APIs
const TechnicianApproveHelp = domain + "/api/users/approval-help/";
const TechnicianRemoveApprovalHelp =
  domain + "/api/users/approval-help/remove-approval-help/";
