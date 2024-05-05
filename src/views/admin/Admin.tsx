import { Button } from "@hilla/react-components/Button";
import { FormLayout } from "@hilla/react-components/FormLayout";
import { HorizontalLayout } from "@hilla/react-components/HorizontalLayout";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout";
import { yupResolver } from "@hookform/resolvers/yup";
import { addTenant } from "../../api/addTenant";
import InputField from "../../components/inputField/InputField";
import { useForm } from "react-hook-form";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import * as yup from "yup";
import "./style.scss";

const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords don't match"),
});
export const responsiveSteps = [
  { minWidth: "0", columns: 1 },
  { minWidth: "500px", columns: 2 },
];
const Admin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
          type: "error",
        }).showToast();
      }
      // }
    }
  };

  return (
    <>
      <div className="tenant_schema">
        <VerticalLayout theme="spacing">
          <HorizontalLayout
            theme="spacing"
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <h2
              style={{
                marginTop: "80px",
                textAlign: "center",
                flex: 1,
              }}
            >
              Create New Tenant
            </h2>
          </HorizontalLayout>
          <FormLayout responsiveSteps={responsiveSteps}>
            <InputField
              errors={errors}
              label="First name"
              name="firstName"
              register={register}
            />
            <InputField
              errors={errors}
              label="last name"
              name="lastName"
              register={register}
            />
            <InputField
              colSpan={2}
              errors={errors}
              label="Username"
              name="username"
              register={register}
            />

            <InputField
              colSpan={2}
              errors={errors}
              label="Email"
              name="email"
              register={register}
              type="email"
            />
            <InputField
              errors={errors}
              label="Password"
              name="password"
              register={register}
              type="password"
            />
            <InputField
              errors={errors}
              label="Confirm password"
              name="confirmPassword"
              register={register}
              type="password"
            />
            <HorizontalLayout theme="spacing" style={{ marginTop: "20px" }}>
              <Button
                className="tenant__schema-button"
                theme="primary"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
              >
                Create Tenant
              </Button>
              <Button
                className="tenant__schema-button"
                theme="secondary"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </HorizontalLayout>
          </FormLayout>
        </VerticalLayout>
      </div>
    </>
  );
};
export default Admin;
