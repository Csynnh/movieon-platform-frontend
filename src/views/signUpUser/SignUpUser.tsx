import { Button, Col, Form } from "antd";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import addUser from "../../api/addUser";
import image from "../../asset/image/sign-up-image.png";
import CustomInput_cp from "../../components/inputField/InputField";
import "./style.scss";

const SignUpUser = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const { firstName, lastName, username, phoneNumber, email, password } =
      data;
    if (firstName && lastName && username && email && phoneNumber && password) {
      try {
        const userData = {
          ...data,
          firstName: firstName.toLowerCase().trim(),
          lastName: lastName.toLowerCase().trim(),
          username: username.toLowerCase().trim(),
          email: email.toLowerCase().trim(),
        };
        const res = await addUser(userData);
        if (res === undefined) {
          Toastify({
            text: `Email or Username already exists!`,
            duration: 3000,
          }).showToast();
        } else {
          navigate("/signin");
          Toastify({
            text: `Created new User: ${firstName}`,
            duration: 3000,
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
          }).showToast();
        }
      } catch (error) {
        Toastify({
          text: `Can't create User: ${firstName}`,
          duration: 3000,
        }).showToast();
      }
    }
  };
  return (
    <>
      <div className="sign_up-container">
        <div className="sign_up-form">
          <h2>ĐĂNG KÝ</h2>
          <Form autoFocus={false} form={form} onFinish={onSubmit}>
            <Col span={11}>
              <CustomInput_cp label="Họ" name="lastName"></CustomInput_cp>
            </Col>
            <Col span={11}>
              <CustomInput_cp label="Tên" name="firstName"></CustomInput_cp>
            </Col>
            <Col span={22}>
              <CustomInput_cp label="Username" name="username"></CustomInput_cp>
            </Col>
            <Col span={22}>
              <CustomInput_cp
                label="Số điện thoại"
                name="phoneNumber"
              ></CustomInput_cp>
            </Col>

            <Col span={22}>
              <CustomInput_cp label="Email" name="email"></CustomInput_cp>
            </Col>
            <Col span={22}>
              <CustomInput_cp
                label="Mật khẩu"
                name="password"
                type="password"
              ></CustomInput_cp>
            </Col>
            <Col span={22}>
              <CustomInput_cp
                label="Nhập lại mật khẩu"
                name="confirmPassword"
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
        <div className="sign_up-image">
          <img src={image} alt="meta" />
        </div>
      </div>
    </>
  );
};

export default SignUpUser;
