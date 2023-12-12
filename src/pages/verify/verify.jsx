import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
// FEATURES
import { useVerifyQuery } from "@/features/api/authApi";
// COMPONENTS
import Loader from "@/layout/Loader/Loader";
import Login from "@/pages/auth/login/login";

const Verify = () => {
  const navigate = useNavigate();
  // const id = location.search.split("=")[1];
  const { id } = useParams();

  const { isLoading, isSuccess, data } = useVerifyQuery({ id });

  useEffect(() => {
    if (isSuccess && data) {
      navigate("/auth/login");
    }
    if (isSuccess && data.data.success === false) {
      toast.error("Your e-mail ia already verified");
      navigate("/auth/login");
    }
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }
  return <Login />;
};

export default Verify;
