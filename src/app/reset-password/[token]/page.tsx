import ResetPassword from "@/components/ResetPassword";
import React from "react";

const ResetPasswordPage = ({ params }: { params: { token: string } }) => {
  const paramsName: string = params.token;
  return (
    <>
      <ResetPassword token={paramsName} />
    </>
  );
};

export default ResetPasswordPage;
