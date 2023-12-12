import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
// ASSETS
import user from "../../assets/images/user.png";
import { ArrowDownIcon, BellIcon, ChevronLeftIcon } from "../../utils/icons";
import { diffDays } from "../../utils/daysdiff";
// FEATURES
import { appSelector, clearState, logout } from "../../features/slice/appSlice";
import { useGetUserByIdQuery, userApi } from "../../features/api/userApi";
import { analyticsApi } from "../../features/api/analyticsApi";
import { pageApi } from "../../features/api/pageApi";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector(appSelector);
  const id = token.affix_userId;
  const [remainingDays, setRemainingDays] = useState(0);

  const {
    data: userByIdData,
    isLoading: userByIdIsLoading,
    isSuccess: userByIdIsSuccess,
  } = useGetUserByIdQuery({ id });

  const logoutHandler = () => {
    dispatch(clearState());
    dispatch(logout());
    navigate("/auth/login");
    // reset api state
    dispatch(userApi.util.resetApiState());
    dispatch(analyticsApi.util.resetApiState());
    dispatch(pageApi.util.resetApiState());
  };

  useEffect(() => {
    if (userByIdIsSuccess) {
      const createdDate = new Date(userByIdData.data.created_at);
      setRemainingDays(diffDays(createdDate, new Date()));
    }
  }, [userByIdIsSuccess]);

  return (
    <header
      className={`text-slate-50 z-10 flex h-[65px] md:h-[78px] items-center justify-between px-[15px] pt-[5px] md:pt-[19px] transition-all duration-700 ease-in-out sm:h-16 md:px-[40px] ${
        userByIdIsLoading ? "animate-pulse" : ""
      }`}
    >
      <div className="flex flex-col items-start justify-start gap-1 sm:flex-row sm:items-center sm:gap-[48px]">
        {(location.pathname.split("/")[2] === "my_page" ||
          location.pathname.split("/")[2] === "users") &&
          location.pathname.split("/").length > 3 && (
            <Link
              to={`/dashboard/${
                location.pathname.split("/")[2] === "my_page"
                  ? "my_page"
                  : "users"
              }`}
              className="custom-transition flex cursor-pointer items-center gap-[5px] hover:scale-105 active:scale-95"
            >
              <ChevronLeftIcon className="h-[20px] w-[20px]" />
              <p className="select-none pt-[5px]">Back</p>
            </Link>
          )}
        <p className="hidden rounded-[8px] bg-brand_secondary py-[9px] px-[9px] pt-[11px] text-[12px] text-[#262626] sm:block md:px-[16px] md:text-[14px] shadow-sm">
          {remainingDays < 0 ? 0 : remainingDays} Days Remaining
        </p>
      </div>
      <div className="flex items-center justify-between gap-10 sm:justify-end">
        {/* <BellIcon className="text-white " /> */}
        <div className="group relative py-0 md:py-4">
          <span
            tabIndex={0}
            className="dropdown flex cursor-pointer items-center gap-2"
          >
            <img
              src={`${
                userByIdIsSuccess
                  ? `${import.meta.env.VITE_BASE_URL}/images/${
                      userByIdData.data.personal_information[0]?.image
                    }`
                  : user
              }`}
              alt="Profile image"
              loading="lazy"
              className="h-[38px] w-[38px] rounded-[8px] bg-white object-cover"
            />
            <p className="hidden text-xs font-semibold lg:inline-block">
              Hi,
              {userByIdIsSuccess
                ? userByIdData.data.personal_information[0]?.full_name
                : ". . . . . . . . . ."}
            </p>
            <ArrowDownIcon className="h-4 w-4" />
            <ul
              tabIndex={0}
              className="dropdown-content menu left-[-25px] top-[45px] w-[100px] rounded-[8px] bg-base-100 p-2 shadow lg:left-[0] lg:w-full"
            >
              <li>
                <Link
                  to="/dashboard/settings"
                  className="ms:px-[1rem] rounded-[8px] px-2 hover:bg-brand_primaryFade active:bg-brand_primary"
                >
                  Settings
                </Link>
              </li>
              <li>
                <p
                  className="ms:px-[1rem] rounded-[8px] px-2 hover:bg-brand_primaryFade active:bg-brand_primary"
                  onClick={() => logoutHandler()}
                >
                  Logout
                </p>
              </li>
            </ul>
          </span>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
