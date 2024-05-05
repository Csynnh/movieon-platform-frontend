import { TextField } from "@hilla/react-components/TextField.js";
import "./style.scss";
import { PasswordField } from "@hilla/react-components/PasswordField.js";
import { EmailField } from "@hilla/react-components/EmailField.js";
const InputField = (props: {
   register: any;
   errors: any;
   name: string;
   label: string;
   type?: string;
   colSpan?: any;
}) => {
   const { register, errors, name, label, type, colSpan } = props;
   return (
      <>
         <div className="input_field-container" {...{ colSpan: colSpan }}>
            {type === "password" ? (
               <PasswordField {...props} label={label} {...register(name)} />
            ) : type === "email" ? (
               <EmailField {...props} label={label} {...register(name)} />
            ) : (
               <TextField {...props} label={label} {...register(name)} />
            )}
            {errors[name] && (
               <span className="input_field-error">{errors[name].message}</span>
            )}
         </div>
      </>
   );
};

export default InputField;
