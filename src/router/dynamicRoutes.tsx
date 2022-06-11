import React, {useEffect, useRef, useState } from "react";
import {
  useNavigate,
  useRoutes,
} from "react-router-dom";
import { SplashScreen } from "../components/splashScreen";
import { useStore } from "../store";
import { TOKEN } from "../store/user.Store";
import { getItem } from "../utils/storage";

const DynamicRoutes = () => {
  const { userStore } = useStore();
  
  const element = useRoutes([...userStore.menus]);
  return element;
};

export default DynamicRoutes;

//路由懒加载的封装
export const lazyLoad = (path: any) => {
  // This must return a Promise which resolves to a module with a default export containing a React componen
  const Comp = React.lazy(() => import(`../pages/${path}`));
  
  return (
    <React.Suspense fallback={<>加载中....</>}>
      <Comp />
    </React.Suspense>
  );
};

export const AuthInit = ({ children }: { children: any }) => {
  const didRequest = useRef(false);
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const { userStore } = useStore();
  const navigate = useNavigate();
  const token = getItem(TOKEN);
  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const requestUser = async () => {

      setShowSplashScreen(true); // todo
      try {
        if (!didRequest.current) {
          await userStore.getUserInfo();
          await userStore.getMenus();
        }
      } catch (error) {
        // console.error(error);
        if (!didRequest.current) {
          navigate("/login", { replace: true });
        }
      } finally {
        setShowSplashScreen(false);
      }

      return () => (didRequest.current = true);
    };

    if (token) {
      requestUser();
    } else {
      navigate("/login", { replace: true });
      setShowSplashScreen(false);
    }
  }, []);

  return showSplashScreen ? <SplashScreen /> : <>{children}</>;
};
