import { Form, Input, Typography } from "antd";
import "./style.scss";
const CustomInput_cp = (props: {
  name: string;
  label: string;
  type?: string;
}) => {
  const { name, label, type } = props;
  return (
    <>
      <Form.Item name={name}>
        {type && type === "password" ? (
          <Input.Password></Input.Password>
        ) : (
          <Input></Input>
        )}
        <Typography.Text>{label}</Typography.Text>
      </Form.Item>
    </>
  );
};

export default CustomInput_cp;
