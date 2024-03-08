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
    case 409:
      responseStatus = {
        status: "info",
        message: "You already have this Item in your Favorite List!",
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
