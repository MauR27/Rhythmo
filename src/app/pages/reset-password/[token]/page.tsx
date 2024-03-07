import ResetPasswordRenderForm from "@/components/auth/ResetPasswordRenderForm";
import React from "react";

const ResetPasswordPage = ({ params }: { params: { token: string } }) => {
  const paramsName: string = params.token;
  return (
    <>
      <ResetPasswordRenderForm token={paramsName} />
    </>
  );
};

export default ResetPasswordPage;
