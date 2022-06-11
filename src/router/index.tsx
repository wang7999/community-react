import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { NotFound } from "../pages/notFound";
import Login from "../pages/user/login";
import DynamicRoutes, { AuthInit } from "./dynamicRoutes";

export const MRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <AuthInit>
              <DynamicRoutes />
            </AuthInit>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
