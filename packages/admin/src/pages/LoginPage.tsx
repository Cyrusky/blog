import { LoginForm, ProFormText } from "@ant-design/pro-components";
import "./LoginPage.scss";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { AuthAPI } from "@/api/auth.ts";
import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN_STORAGE_KEY } from "@boris/common/src/constant";

interface LoginFormFields {
  username: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const handleFormFinished = async (values: LoginFormFields) => {
    AuthAPI.login({
      username: values.username,
      password: values.password,
    }).then((res) => {
      if (res.token) {
        localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, res.token);
        navigate("/");
      }
    });
  };

  return (
    <LoginForm
      className={"login-page"}
      title={"Boris"}
      onFinish={handleFormFinished}
    >
      <ProFormText
        style={{
          marginTop: 100,
        }}
        name="username"
        fieldProps={{
          size: "large",
          prefix: <UserOutlined className={"prefixIcon"} />,
        }}
        placeholder={"用户名"}
        rules={[
          {
            required: true,
            message: "请输入用户名!",
          },
        ]}
      />
      <ProFormText.Password
        name="password"
        fieldProps={{
          size: "large",
          prefix: <LockOutlined className={"prefixIcon"} />,
          statusRender: (value) => {
            const getStatus = () => {
              if (value && value.length > 12) {
                return "ok";
              }
              if (value && value.length > 6) {
                return "pass";
              }
              return "poor";
            };
            const status = getStatus();
            if (status === "pass") {
              return <div style={{ color: "yellow" }}>强度：中</div>;
            }
            if (status === "ok") {
              return <div style={{ color: "green" }}>强度：强</div>;
            }
            return <div style={{ color: "red" }}>强度：弱</div>;
          },
        }}
        placeholder={"密码"}
        rules={[
          {
            required: true,
            message: "请输入密码！",
          },
        ]}
      />
    </LoginForm>
  );
};

export default LoginPage;
