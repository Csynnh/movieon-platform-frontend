import { Button, Col, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import { signInAdmin } from "../../api/signInAdmin";
import Logo from "../../asset/icon/Logo";
import SignInAdminImage from "../../asset/icon/SignInAdminImage";
import "./SignInTenant.scss";
import { useState } from "react";
const SignInTenant = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (values: any) => {
    const { username, password } = values;
    if (username && password) {
      try {
        setLoading(true);
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
          navigate("/admin");
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
    setLoading(false);
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
        <Form form={form} onFinish={onSubmit} autoFocus={false}>
          <Col>
            <Form.Item
              name={"username"}
              required
              label={"Username"}
              rules={[
                {
                  required: true,
                  message: `Please input your username!`,
                },
              ]}
            >
              <Input disabled={loading}></Input>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label={"Password"}
              name={"password"}
              required
              rules={[
                {
                  required: true,
                  message: `Please input your password!`,
                },
              ]}
            >
              <Input.Password disabled={loading}></Input.Password>
            </Form.Item>
          </Col>
          <Button
            htmlType="submit"
            className="tenant__schema-button"
            type="primary"
            loading={loading}
            disabled={loading}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SignInTenant;
