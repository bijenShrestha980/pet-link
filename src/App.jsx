import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// PAGES
import Auth from "./layout/auth";
// LAZY
const Dashboard = lazy(() => import("./layout/dashboard"));
const Verify = lazy(() => import("./pages/verify/verify"));

function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/verify/:id" element={<Verify />} />
          <Route
            path="/dashboard/*"
            element={
              <Suspense
                fallback={
                  <SkeletonTheme baseColor="#f8ffd29e" highlightColor="#ffffff">
                    <Skeleton className="h-[100dvh] w-full" />
                  </SkeletonTheme>
                }
              >
                <Dashboard />
              </Suspense>
            }
          />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
