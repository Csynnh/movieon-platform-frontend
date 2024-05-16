import { Button, Card, Col, Form, Input, Typography } from "antd";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { addTenant } from "../../api/addTenant";
import "toastify-js/src/toastify.css";
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
            <Form.Item label="First Name" name="firstName">
              <Input></Input>
            </Form.Item>
          </Col>
          <Col span={22}>
            <Form.Item label="Last Name" name="lastName">
              <Input></Input>
            </Form.Item>
          </Col>
          <Col span={22}>
            <Form.Item label="Username" name="username">
              <Input></Input>
            </Form.Item>
          </Col>
          <Col span={22}>
            <Form.Item label="Email" name="email">
              <Input></Input>
            </Form.Item>
          </Col>
          <Col span={22}>
            <Form.Item label="Password" name="password">
              <Input.Password></Input.Password>
            </Form.Item>
          </Col>
          <Col span={22}>
            <Button onClick={() => form.submit()}>Create Tenant</Button>
          </Col>
          <Input></Input>
        </Form>
      </Card>
    </>
  );
};
export default Admin;
