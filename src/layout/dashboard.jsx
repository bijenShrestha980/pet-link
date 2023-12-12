import React, { Suspense, useEffect } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// FEATURES
import { useGetUserByIdQuery } from "../features/api/userApi";
import {
  appSelector,
  setRoles,
  clearState,
  logout,
} from "../features/slice/appSlice";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import ProtectedRoute from "../components/ProtectedRoute";
import Loader from "./Loader/Loader";
import { routes } from "../routes";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector(appSelector);
  const id = token.affix_userId;

  const {
    data: userByIdData,
    isLoading: userByIdIsLoading,
    isSuccess: userByIdIsSuccess,
    error: userByIdError,
  } = useGetUserByIdQuery({ id });

  useEffect(() => {
    userByIdData?.data.roles.map((el) =>
      el.name === "super_admin"
        ? dispatch(setRoles(true))
        : dispatch(setRoles(false))
    );
  }, [userByIdData?.data]);

  useEffect(() => {
    if (userByIdError?.originalStatus === 500) {
      dispatch(clearState());
      dispatch(logout());
      navigate("/auth/login");
    }
  }, [userByIdError]);

  if (userByIdIsLoading || !userByIdIsSuccess) {
    return <Loader className="custom-transition h-[100dvh]" />;
  }
  return (
    <div className="relative flex md:static bg-[#f0f8ff]">
      <Sidebar />
      <div className="custom-transition h-[100dvh] w-full overflow-y-scroll md:h-full">
        <Header />
        <main className="custom-transition mt-[10px] md:mt-[43px] mr-[15px] ml-[15px] lg:ml-[40px] lg:mr-[20px] xl:mr-0">
          <Routes>
            {routes.map(
              ({ layout, pages }) =>
                layout === "dashboard" &&
                pages.map(({ path, element, i }) => (
                  <Route
                    key={i}
                    exact
                    path={path}
                    element={
                      <ProtectedRoute token={token}>
                        <Suspense
                          fallback={
                            <SkeletonTheme
                              baseColor="#f8ffd29e"
                              highlightColor="#ffffff"
                            >
                              <Skeleton className="h-[100dvh] w-full" />
                            </SkeletonTheme>
                          }
                        >
                          {element}
                        </Suspense>
                      </ProtectedRoute>
                    }
                  />
                ))
            )}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
