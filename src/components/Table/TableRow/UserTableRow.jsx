import React, { useEffect, memo } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// FEATURES
import { useUpdateActiveStatusMutation } from "../../../features/api/userApi";
import { EyeOpenIcon } from "../../../utils/icons";
import Ellipsis from "../../../layout/Loader/Ellipsis";

const UserTableRow = (props) => {
  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      isSuccess: updateUserIsSuccess,
      error: updateUserError,
    },
  ] = useUpdateActiveStatusMutation();

  useEffect(() => {
    if (updateUserIsSuccess) {
      toast.success(updateUserData.message);
    }
    if (updateUserError) {
      toast.error(updateUserError.data.message);
    }
  }, [updateUserIsSuccess, updateUserError]);

  if (updateUserIsLoading) {
    return (
      <tr className="bg-[#f1f5f9]">
        <td className="py-3 pl-5">
          <Ellipsis />
        </td>
        <td className="py-3 pl-5">
          <Ellipsis />
        </td>
        <td className="py-3 pl-5">
          <Ellipsis />
        </td>
        <td className="py-3 pl-5">
          <Ellipsis />
        </td>
        <td className="py-3 pl-5">
          <Ellipsis />
        </td>
        <td className="py-3 pl-5">
          <Ellipsis />
        </td>
        <td className="py-3 pl-5">
          <Ellipsis />
        </td>
        <td className="py-3 pl-5">
          <Ellipsis />
        </td>
        <td className="py-3 pl-5">
          <Ellipsis />
        </td>
      </tr>
    );
  }
  return (
    <tr className="border-b border-solid border-[#94a3b8] border-opacity-20 transition duration-500 ease-in-out hover:bg-[#f1f5f9]">
      <td className="py-3 pl-5">{props.sn + 1 + props.itemOffset}</td>
      <td className="select-none py-3 px-5">{props.name ? props.name : "-"}</td>
      <td className="select-none py-3 px-5">
        {props.email ? props.email : "-"}
      </td>
      <td className="select-none py-3 px-5">
        {props.phone ? props.phone : "-"}
      </td>
      <td className="py-3 px-5">
        {props.master_link ? props.master_link : "-"}
      </td>
      <td className="select-none py-3 px-5">
        {props.lastTappedOn ? props.lastTappedOn : "-"}
      </td>
      <td className="select-none py-3 px-5">{props.page ? props.page : "-"}</td>
      <td className="custom-transition cursor-pointer select-none py-3 px-5 hover:scale-105 hover:shadow-lg active:scale-95">
        <span
          className={`rounded-pill badge ${
            props.active === "yes"
              ? "badge-light-primary"
              : "badge-light-danger"
          }`}
          onClick={() => {
            updateUser({
              active: props.active === "yes" ? 1 : 2,
              id: props.id,
            });
          }}
        >
          {props.active ? props.active : "-"}
        </span>
      </td>

      <td className="custom-transition cursor-pointer select-none py-3 px-5 hover:shadow-lg active:scale-95">
        <Link to={`/dashboard/users/${props.id}`}>
          <EyeOpenIcon className="custom-transition h-5 w-5 text-[#94a3b8] hover:text-[#020202]" />
        </Link>
      </td>
    </tr>
  );
};

export default memo(UserTableRow);
