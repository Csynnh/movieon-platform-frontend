import { Button } from "@hilla/react-components/Button.js";
import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import * as yup from "yup";
import addUser from "../../api/addUser";
import image from "../../asset/image/sign-up-image.png";
import Loading from "../../components/loading/Loading";
import { responsiveSteps } from "../admin/Admin";
import Input from "../checkout/Input";
import "./style.scss";
const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .test("startsWithZero", "Phone number must start with 0", (val) => {
      return val.charAt(0) === "0";
    })
    .test("len", "Must be exactly 10 characters", (val) => {
      return val.length === 10;
    }),
  username: yup.string().required("Username is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords don't match"),
});
const SignUpUser = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
            type: "error",
          }).showToast();
        } else {
          reset({
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
          });
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
          type: "error",
        }).showToast();
      }
    }
  };
  return (
    <Loading spinning={isSubmitting}>
      <div className="sign_up-container">
        <div className="sign_up-form">
          <h2>ĐĂNG KÝ</h2>
          <FormLayout responsiveSteps={responsiveSteps} autoFocus={false}>
            <Input
              errors={errors}
              colSpan={1}
              label="Họ"
              name="lastName"
              register={register}
            />
            <Input
              colSpan={1}
              errors={errors}
              label="Tên"
              name="firstName"
              register={register}
            />
            <Input
              errors={errors}
              colSpan={2}
              label="Username"
              name="username"
              register={register}
            />
            <Input
              errors={errors}
              colSpan={2}
              label="Số điện thoại"
              name="phoneNumber"
              type="number"
              register={register}
            />
            <Input
              errors={errors}
              label="Email"
              name="email"
              type="email"
              register={register}
            />
            <Input
              errors={errors}
              label="Mật khẩu"
              name="password"
              type="password"
              register={register}
            />
            <Input
              errors={errors}
              label="Nhập lại mật khẩu"
              name="confirmPassword"
              type="password"
              register={register}
            />
            <Button
              className="tenant__schema-button"
              theme="primary"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </FormLayout>
        </div>
        <div className="sign_up-image">
          <img src={image} alt="meta" />
        </div>
      </div>
    </Loading>
  );
};

export default SignUpUser;
