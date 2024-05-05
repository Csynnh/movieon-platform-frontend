import { Button } from "@hilla/react-components/Button.js";
import "./style.scss";
import { RadioButton } from "@hilla/react-components/RadioButton.js";

const TimeButton = (props: { children: any, isActive?: boolean }) => {
  return (
    <RadioButton>
      <label slot="label">
        <Button theme={`${props?.isActive ? 'primary': 'secondary'}`} color="#0B2447">{props?.children}</Button>
      </label>
    </RadioButton>
  );
};

export default TimeButton;
