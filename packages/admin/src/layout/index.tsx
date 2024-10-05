import { ProLayout } from "@ant-design/pro-components";
import { Route, Routes, useLocation } from "react-router-dom";
import { SiderMenu } from "@/layout/SiderMenu.tsx";
import { routers } from "@/router/routers.tsx";
import LogoImage from "@/assets/logo.webp";
import { useCheckLogin } from "@/hooks/useCheckLogin.ts";

export const Layout = () => {
  const router = useLocation();
  useCheckLogin();

  if (router.pathname === "/login") {
    return (
      <Routes>
        {routers.map((router) => {
          return (
            <Route
              key={router.path}
              path={router.path}
              element={router.element}
            />
          );
        })}
      </Routes>
    );
  }

  return (
    <ProLayout
      logo={LogoImage}
      title={"Boris 管理系统"}
      layout={"side"}
      menuContentRender={() => <SiderMenu />}
    >
      <Routes>
        {routers.map((router) => {
          return (
            <Route
              key={router.path}
              path={router.path}
              element={router.element}
            />
          );
        })}
      </Routes>
    </ProLayout>
  );
};
