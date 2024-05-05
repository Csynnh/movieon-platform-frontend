import { Button } from "@hilla/react-components/Button.js";
import EyeIcon from "../../asset/icon/EyeIcon";
import GoogleIcon from "../../asset/icon/GoogleIcon";
import PhoneIcon from "../../asset/icon/PhoneIcon";
import { useForm } from "react-hook-form";
import SignIn from "../../asset/image/login.png";
import Input from "../checkout/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Login.scss";
import { signInUser } from "../../api/signInUser";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useNavigate } from "react-router-dom";
import { FormLayout } from "@hilla/react-components/FormLayout.js";

const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});
const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    const { username, password } = data;
    if (username && password) {
      try {
        const response = await signInUser(username, password);
        if (response.data.status) {
          Toastify({
            text: `Signed in user: ${username}`,
            duration: 3000,
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
          }).showToast();
          localStorage.setItem(
            "user",
            JSON.stringify({ username: username, password: password })
          );
          navigate("/");
        } else {
          if (response.data.message === "Password not match")
            setError("password", {
              type: "manual",
              message: "Password not match!",
            });
          Toastify({
            text: `${response.data.message}`,
            duration: 3000,
            style: {
              background: "linear-gradient(to right, #ff416c, #ff4b2b)",
              color: "#fff",
              fontWeight: "500",
            },
            type: "error",
          }).showToast();
        }
      } catch (error) {
        Toastify({
          text: `Can't sign in Tenant: ${username}`,
          duration: 3000,
          type: "error",
        }).showToast();
      }
    }
  };
  return (
    <div className="login">
      <div className="login-container">
        <div className="login-left">
          <FormLayout className="login-form">
            <Input
              register={register}
              errors={errors}
              name="username"
              label="Username"
            ></Input>
            <Input
              register={register}
              errors={errors}
              name="password"
              type="password"
              label="Password"
            ></Input>
            <div className="login-forgot">
              <a href="/">Quên mật khẩu</a>
            </div>
            <div className="login-button-wrap">
              <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
                Đăng nhập
              </Button>
              <Button disabled={isSubmitting}>
                <div className="login-btn">
                  <div className="login-lable">Đăng nhập bằng Google</div>
                  <GoogleIcon />
                </div>
              </Button>
              <Button disabled={isSubmitting}>
                <div className="login-btn">
                  <div className="login-lable">Đăng nhập bằng điện thoại</div>
                  <PhoneIcon />
                </div>
              </Button>
            </div>
            <div className="login-signup">
              <a href="/">Đăng ký</a>
            </div>
          </FormLayout>
        </div>
        <div className="login-right">
          <img src={SignIn} alt="SigninImg" />
        </div>
      </div>
    </div>
  );
};

export default Login;
