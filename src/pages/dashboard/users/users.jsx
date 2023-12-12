import React from "react";
import { motion } from "framer-motion";
// FEATURES
import { useGetUsersQuery } from "../../../features/api/userApi";
// COMPONENTS
import Loader from "../../../layout/Loader/Loader";
import UserTable from "../../../components/Table/UserTable";

const Users = () => {
  const {
    data: userData,
    isLoading: userIsLoading,
    isSuccess: userIsSuccess,
  } = useGetUsersQuery();

  if (userIsLoading || !userIsSuccess) {
    return <Loader className="min-h-[calc(100dvh-121px)]" />;
  }
  return (
    <motion.div
      className="mr-0 mb-[20px] lg:mr-[20px]"
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 100 }}
      exit={{ x: -200, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-[24px] flex items-center justify-between gap-[40px]">
        <h2>Users</h2>
      </div>
      <div className="">
        <UserTable title="User Data" tableData={userData.data} />
      </div>
    </motion.div>
  );
};

export default Users;
