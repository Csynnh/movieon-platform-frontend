import { Button, Col, Form } from "antd";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { signInUser } from "../../api/signInUser";
import GoogleIcon from "../../asset/icon/GoogleIcon";
import PhoneIcon from "../../asset/icon/PhoneIcon";
import SignIn from "../../asset/image/login.png";
import CustomInput_cp from "../../components/inputField/InputField";
import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
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
            Toastify({
              text: `${response.data.message}`,
              duration: 3000,
              style: {
                background: "linear-gradient(to right, #ff416c, #ff4b2b)",
                color: "#fff",
                fontWeight: "500",
              },
            }).showToast();
        }
      } catch (error) {
        Toastify({
          text: `Can't sign in Tenant: ${username}`,
          duration: 3000,
        }).showToast();
      }
    }
  };
  return (
    <div className="login">
      <div className="login-container">
        <div className="login-left">
          <Form className="login-form" onFinish={onSubmit} form={form}>
            <Col span={22}>
              <CustomInput_cp name="username" label="Username" />
            </Col>
            <Col span={22}>
              <CustomInput_cp
                name="password"
                label="Password"
                type="password"
              />
            </Col>
            <div className="login-forgot">
              <a href="/">Quên mật khẩu</a>
            </div>
            <div className="login-button-wrap">
              <Button onClick={() => form.submit()}>Đăng nhập</Button>
              <Button>
                <div className="login-btn">
                  <div className="login-lable">Đăng nhập bằng Google</div>
                  <GoogleIcon />
                </div>
              </Button>
              <Button>
                <div className="login-btn">
                  <div className="login-lable">Đăng nhập bằng điện thoại</div>
                  <PhoneIcon />
                </div>
              </Button>
            </div>
            <div className="login-signup">
              <a href="/">Đăng ký</a>
            </div>
          </Form>
        </div>
        <div className="login-right">
          <img src={SignIn} alt="SigninImg" />
        </div>
      </div>
    </div>
  );
};

export default Login;
