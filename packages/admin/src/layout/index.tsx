import { ProLayout } from "@ant-design/pro-components";
import LogoImage from "@/assets/logo.webp";
import { SiderMenu } from "@/layout/SiderMenu.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routers } from "@/router/routers.tsx";

export const Layout = () => {
  return (
    <Router basename={"/admin"}>
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
    </Router>
  );
};
