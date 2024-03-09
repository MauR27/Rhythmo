import { AlertStatus } from "@chakra-ui/react";

export const statusError = (status: number) => {
  let responseStatus: { status: AlertStatus; message: string } = {
    message: "",
    status: "info",
  };
  switch (status) {
    case 201:
      responseStatus = {
        status: "success",
        message: "Item marked as Favorite!",
      };
      break;
    case 401:
      responseStatus = {
        status: "error",
        message: "Password must be at least 6 caracteres",
      };
      break;
    case 402:
      responseStatus = {
        status: "error",
        message: "Email already in use",
      };
      break;
    case 403:
      responseStatus = {
        status: "error",
        message: "Invalid user data",
      };
      break;
    case 409:
      responseStatus = {
        status: "info",
        message: "Remove from favorite...",
      };
      break;
    case 400:
      responseStatus = {
        status: "error",
        message: "You have to Login first",
      };
      break;
    case 405:
      responseStatus = {
        status: "error",
        message: "Email already exsist",
      };
      break;
    case 202:
      responseStatus = {
        status: "success",
        message: "Item added successfully!",
      };
      break;
    case 203:
      responseStatus = {
        status: "success",
        message: "user password was updated",
      };
      break;
    case 204:
      responseStatus = {
        status: "success",
        message: "Profile was updated!",
      };
      break;
    default:
      break;
  }
  return responseStatus;
};
