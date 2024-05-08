import { Form, Input } from "antd";
import "./style.scss";
const CustomInput_cp = (props: {
  name: string;
  label: string;
  type?: string;
}) => {
  const { name, label, type } = props;
  return (
    <Form.Item
      name={name}
      label={label}
      required
      rules={[
        {
          required: true,
          message: `Please input your ${label}!`,
        },
      ]}
    >
      {type && type === "password" ? (
        <Input.Password></Input.Password>
      ) : (
        <Input></Input>
      )}
    </Form.Item>
  );
};

export default CustomInput_cp;
