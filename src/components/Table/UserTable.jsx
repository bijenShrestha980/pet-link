import React, { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
// UTILS
import { ArrowUpDownIcon } from "../../utils/icons";
import { sortBy } from "../../utils/sort";
// COMPONENTS
import Pagination from "../Pagination/Pagination";
import UserTableRow from "./TableRow/UserTableRow";

const UserTable = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter
  function search(e) {
    e.preventDefault();
    var lowerCase = e.target.value.toLowerCase();
    setSearchTerm(lowerCase);
    setItemOffset(0);
    setPageCount(1);
  }

  const filteredData = props.tableData?.filter((el) => {
    if (searchTerm === "") {
      return el;
    } else {
      return (
        el?.name?.toLowerCase().includes(searchTerm) ||
        el?.email?.toLowerCase().includes(searchTerm) ||
        el?.master_link?.toLowerCase().includes(searchTerm) ||
        el?.active?.toLowerCase().includes(searchTerm)
      );
    }
  });

  useEffect(() => {
    if (filteredData) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(filteredData?.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(filteredData.length / itemsPerPage));
    }
  }, [itemOffset, itemsPerPage, searchTerm, props.tableData]);

  return (
    <motion.div
      className={`h-fit rounded-xl bg-white py-6 px-6 shadow-md ${
        props.className && props.className
      }`}
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 100 }}
      exit={{ x: -200, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="mb-6 gap-2 overflow-x-auto md:flex md:items-center md:justify-between"
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 100 }}
        exit={{ x: -200, opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h5 className="mb-4 text-lg font-bold uppercase text-brand_primary md:mb-0">
          {props.title}
        </h5>
        <div className="mb-6 gap-2 overflow-x-auto md:flex md:items-center md:justify-end">
          <input
            type="text"
            placeholder="Search..."
            className="rounded-md border border-solid border-[#94a3b8] border-opacity-50 py-2 px-4  text-sm duration-500 ease-in-out focus:shadow-sm focus-visible:outline-0"
            onChange={search}
          />
        </div>
      </motion.div>
      <div className="overflow-x-auto">
        <motion.table
          className="mb-6 w-full"
          onClick={props.onClick}
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 100 }}
          exit={{ x: -200, opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          <thead className="border-b border-solid border-[#94a3b8] border-opacity-20 text-left text-[12px] text-[#475569] opacity-50 transition duration-300 ease-in-out">
            <tr>
              <th
                className="group cursor-pointer py-3 px-5"
                // onClick={() => {
                //   sortBy({
                //     key: "id",
                //     currentItems,
                //     setCurrentItems,
                //   });
                // }}
              >
                <div className="flex items-center justify-between">
                  <p className="select-none">SN</p>
                  {/* <span className="h-3 w-3 transition ease-in-out duration-150 rounded-full group-hover:scale-125 active:scale-150">
                    <ArrowUpDownIcon className="h-3 w-3" />
                  </span> */}
                </div>
              </th>

              <th
                className="group cursor-pointer py-3 px-5"
                onClick={() => {
                  sortBy({
                    key: "name",
                    currentItems,
                    setCurrentItems,
                  });
                }}
              >
                <div className="flex items-center justify-between">
                  <p className="select-none">Name</p>
                  <span className="h-3 w-3 rounded-full transition duration-150 ease-in-out active:scale-150 group-hover:scale-125">
                    <ArrowUpDownIcon className="h-3 w-3" />
                  </span>
                </div>
              </th>

              <th
                className="group cursor-pointer py-3 px-5"
                onClick={() => {
                  sortBy({
                    key: "email",
                    currentItems,
                    setCurrentItems,
                  });
                }}
              >
                <div className="flex items-center justify-between">
                  <p className="select-none">Email</p>
                  <span className="h-3 w-3 rounded-full transition duration-150 ease-in-out active:scale-150 group-hover:scale-125">
                    <ArrowUpDownIcon className="h-3 w-3" />
                  </span>
                </div>
              </th>
              <th
                className="group cursor-pointer py-3 px-5"
                onClick={() => {
                  sortBy({
                    key: "phone",
                    currentItems,
                    setCurrentItems,
                  });
                }}
              >
                <div className="flex items-center justify-between">
                  <p className="select-none">Mobile</p>
                  <span className="h-3 w-3 rounded-full transition duration-150 ease-in-out active:scale-150 group-hover:scale-125">
                    <ArrowUpDownIcon className="h-3 w-3" />
                  </span>
                </div>
              </th>

              <th
                className="group cursor-pointer py-3 px-5"
                // onClick={() => {
                //   sortBy({
                //     key: "master_link",
                //     currentItems,
                //     setCurrentItems,
                //   });
                // }}
              >
                <div className="flex items-center justify-between">
                  <p className="select-none">Master Link</p>
                </div>
              </th>

              <th
                className="group cursor-pointer py-3 px-5"
                onClick={() => {
                  sortBy({
                    key: "updated_at",
                    currentItems,
                    setCurrentItems,
                  });
                }}
              >
                <div className="flex items-center justify-between">
                  <p className="select-none">Last Tapped</p>
                  <span className="h-3 w-3 rounded-full transition duration-150 ease-in-out active:scale-150 group-hover:scale-125">
                    <ArrowUpDownIcon className="h-3 w-3" />
                  </span>
                </div>
              </th>

              <th className="group cursor-pointer py-3 px-5">
                <div className="flex items-center justify-between">
                  <p className="select-none">Active page</p>
                </div>
              </th>

              <th
                className="group cursor-pointer py-3 px-5"
                onClick={() => {
                  sortBy({
                    key: "active",
                    currentItems,
                    setCurrentItems,
                  });
                }}
              >
                <div className="flex items-center justify-between">
                  <p className="select-none">Active</p>
                  <span className="h-3 w-3 rounded-full transition duration-150 ease-in-out active:scale-150 group-hover:scale-125">
                    <ArrowUpDownIcon className="h-3 w-3" />
                  </span>
                </div>
              </th>

              {/* <th className="py-3 px-5 cursor-pointer group">
                <div className="flex items-center justify-between">
                  <p className="select-none">Action</p>
                </div>
              </th> */}
            </tr>
          </thead>
          <tbody className="text-slate-800 text-left text-sm font-semibold opacity-75 transition duration-300 ease-in-out">
            {currentItems &&
              currentItems
                .filter((el) => el?.roles[0]?.name !== "super_admin")
                .map((item, i) => (
                  <UserTableRow
                    key={i}
                    sn={i}
                    id={item.id && item.id}
                    name={item.name && item.name}
                    email={item.email && item.email}
                    phone={item.phone && item.phone}
                    master_link={item.master_link && item.master_link}
                    lastTappedOn={item.lastTappedOn && item.lastTappedOn}
                    page={item.page && item.page?.type}
                    active={item.active && item.active}
                    itemOffset={itemOffset && itemOffset}
                    // onClick={() => navigate(`/dashboard/users/${item.id}`)}
                  />
                ))}
          </tbody>
        </motion.table>
        <motion.div
          className="flex min-w-fit items-center justify-between"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 100 }}
          exit={{ x: -200, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 ">
            <select
              className="select-bordered select select-sm w-fit max-w-xs text-[#a3a1a1] focus-within:outline-none focus:outline-none"
              onChange={(e) => setItemsPerPage(e.target.value)}
            >
              <option selected value={10}>
                10
              </option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={props.tableData?.length}>All</option>
            </select>
            <p className="text-[12px] font-semibold text-[#475569] opacity-50">
              Showing&nbsp;{itemOffset + 1}&nbsp;to&nbsp;
              {itemOffset + (currentItems?.length || 0)}
              &nbsp;of&nbsp;
              {props.tableData?.length || 0}
            </p>
          </div>
          {pageCount > 1 && (
            <Pagination
              pageCount={pageCount}
              setItemOffset={setItemOffset}
              filteredData={filteredData}
              itemsPerPage={itemsPerPage}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default memo(UserTable);
