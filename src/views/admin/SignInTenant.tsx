import { Button } from "@hilla/react-components/Button.js";
import { FormLayout } from "@hilla/react-components/FormLayout.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInAdmin } from "../../api/signInAdmin";
import Logo from "../../asset/icon/Logo";
import SignInAdminImage from "../../asset/icon/SignInAdminImage";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import * as yup from "yup";
import Input from "../checkout/Input";
import { responsiveSteps } from "./Admin";
import "./SignInTenant.scss";
const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});
const SignInTenant = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
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
        <FormLayout responsiveSteps={responsiveSteps}>
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
            label="Password"
            name="password"
            register={register}
            type={"password"}
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
    </div>
  );
};

export default SignInTenant;
