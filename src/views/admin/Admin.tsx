import { Button, Card, Col, Form, Typography } from "antd";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { addTenant } from "../../api/addTenant";
import "toastify-js/src/toastify.css";
import CustomInput_cp from "../../components/inputField/InputField";
import "./style.scss";

export const responsiveSteps = [
  { minWidth: "0", columns: 1 },
  { minWidth: "500px", columns: 2 },
];
const Admin = () => {
  const [form] = Form.useForm();

  const onSubmit = async (data: any) => {
    const { firstName, lastName, username, email, password } = data;
    if (firstName && lastName && username && email && password) {
      try {
        await addTenant(data);
        Toastify({
          text: `Created new Tenant: ${firstName}`,
          duration: 3000,
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        }).showToast();
      } catch (error) {
        Toastify({
          text: `Can't create Tenant: ${firstName}`,
          duration: 3000,
        }).showToast();
      }
      // }
    }
  };

  return (
    <>
      <Card className="tenant_schema">
        <Form form={form} onFinish={onSubmit}>
          <Col span={24}>
            <Typography.Title
              style={{
                textAlign: "center",
              }}
              level={2}
            >
              Create New Tenant
            </Typography.Title>
          </Col>
          <Col span={22}>
            <CustomInput_cp
              label="First Name"
              name="firstName"
            ></CustomInput_cp>
          </Col>
          <Col span={22}>
            <CustomInput_cp label="Last Name" name="lastName"></CustomInput_cp>
          </Col>
          <Col span={22}>
            <CustomInput_cp label="Username" name="username"></CustomInput_cp>
          </Col>
          <Col span={22}>
            <CustomInput_cp label="Email" name="email"></CustomInput_cp>
          </Col>
          <Col span={22}>
            <CustomInput_cp
              label="Password"
              name="password"
              type="password"
            ></CustomInput_cp>
          </Col>
          <Col span={22}>
            <Button onClick={() => form.submit()}>Create Tenant</Button>
          </Col>
        </Form>
      </Card>
    </>
  );
};
export default Admin;
