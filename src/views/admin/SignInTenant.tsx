import { Button, Col, Form } from "antd";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import { signInAdmin } from "../../api/signInAdmin";
import Logo from "../../asset/icon/Logo";
import SignInAdminImage from "../../asset/icon/SignInAdminImage";
import CustomInput_cp from "../../components/inputField/InputField";
import "./SignInTenant.scss";
const SignInTenant = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onSubmit = async (data: any) => {
    const { username, password } = data;
    if (username && password) {
      try {
        const response = await signInAdmin(username, password);
        if (response.data.status) {
          Toastify({
            text: `Signed In Tenant: ${username}`,
            duration: 3000,
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
          }).showToast();
          localStorage.setItem(
            "tenant",
            JSON.stringify({ username: username, password: password })
          );
          navigate("/admin/dashboard");
        } else {
          Toastify({
            text: `${response.data.message}`,
            duration: 3000,
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
    <div className="tenant_signin-container">
      <div className="tenant_signin-image">
        <SignInAdminImage />
      </div>
      <div className="tenant_signin-form">
        <h1>
          <Logo />
        </h1>
        <Form form={form} onFinish={onSubmit}>
          <Col span={22}>
            <CustomInput_cp label={"Username"} name="username"></CustomInput_cp>
          </Col>
          <Col span={22}>
            <CustomInput_cp
              label={"Password"}
              name="password"
              type="password"
            ></CustomInput_cp>
          </Col>

          <Button
            className="tenant__schema-button"
            type="primary"
            onClick={() => form.submit()}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignInTenant;
