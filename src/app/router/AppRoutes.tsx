import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { Center } from "../pages/center";
import { CenterBase } from "../pages/center/base";
import { CenterMessage } from "../pages/center/message";
import { CenterMypost } from "../pages/center/mypost";
import { CenterUser } from "../pages/center/user";
import { Index } from "../pages/index";
import { Login } from "../pages/login";
import { My } from "../pages/my";
import { PostDetails } from "../pages/post/details";
import { PostEdit } from "../pages/post/edit";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/index" />} />
          <Route path="/:type" element={<Index />} />
          <Route path="/post/detail/:id" element={<PostDetails />} />
          <Route path="/post/edit/:id" element={<PostEdit />} />
          <Route path="/my" element={<My />} />
          <Route path="/login" element={<Login />} />
          <Route path="/center" element={<Center />} >

          <Route path="user" element={<CenterUser />} />
            <Route path="base" element={<CenterBase />} />
            <Route path="mypost" element={<CenterMypost />} />
            <Route path="message" element={<CenterMessage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
