import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "@/api/auth.ts";

export const useCheckLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AuthAPI.isLogin().then((res) => {
      if (res.code === 0) {
        navigate("/login");
      }
    });
  }, [navigate]);
};
