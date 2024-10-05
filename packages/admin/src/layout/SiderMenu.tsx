import { Menu } from "antd";
import { FC, useEffect, useState } from "react";
import { routers } from "@/router/routers.tsx";
import { useLocation, useNavigate } from "react-router-dom";

export const SiderMenu: FC = () => {
  const navigate = useNavigate();
  const [defaultActive, setDefaultActive] = useState("");
  const location = useLocation();

  const menuItems = routers
    .filter((router) => {
      return router.display;
    })
    .map((router) => {
      return {
        key: router.name,
        label: router.name,
        icon: router.icon || null,
        onClick: () => {
          if (!router.path || router.path === "/") {
            navigate("/");
            return;
          }
          navigate(router.path);
        },
      };
    });

  useEffect(() => {
    const pathname = location.pathname;
    const router = routers.find((router) => router.path === pathname);
    if (router) {
      setDefaultActive(router.name);
    }
  }, [location.pathname]);

  return (
    <Menu
      items={menuItems}
      defaultActiveFirst={true}
      defaultValue={defaultActive}
      onChange={() => {
        console.log("changed");
      }}
    />
  );
};
