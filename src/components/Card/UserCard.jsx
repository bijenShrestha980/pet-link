import React from "react";
import { motion } from "framer-motion";
import AddUserModal from "../Modal/CreateUserModal";
import AddBulkUser from "../Modal/AddBulkUser";
export default function UserCard() {
  return (
    <>
      <motion.div
        className={`flex h-full w-full flex-col justify-between rounded-lg bg-white p-[24px]`}
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 100 }}
        exit={{ x: -200, opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h4 className="mb-[26px]">Users</h4>
        <div className="flex gap-2">
          <label
            htmlFor="addBulkUserModel"
            className={`flex  h-[44px]  w-full cursor-pointer select-none items-center justify-center rounded-[8px] bg-brand_primary text-[14px] font-[700] leading-[20px] text-[#ffffff] transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md active:scale-90`}
          >
            Add Bulk User
          </label>
          <label
            htmlFor="addUserModel"
            className={`flex  h-[44px]  w-full cursor-pointer select-none items-center justify-center rounded-[8px] bg-brand_primary text-[14px] font-[700] leading-[20px] text-[#ffffff] transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md active:scale-90`}
          >
            Add User
          </label>
        </div>
      </motion.div>
      <input type="checkbox" id="addBulkUserModel" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box mx-auto bg-white p-[initial]">
          <AddBulkUser />
        </div>
      </div>
      <input type="checkbox" id="addUserModel" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box mx-auto bg-white p-[initial]">
          <AddUserModal />
        </div>
      </div>
    </>
  );
}
