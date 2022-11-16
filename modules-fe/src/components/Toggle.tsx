import { Switch } from "@amsterdam/asc-ui";

type Props = {
  checked: number;
  onSwitch: (identifier: string) => void;
  identifier: string;
};

const Toggle = ({ onSwitch, checked, identifier }: Props) => {
  return (
    <div>
      <Switch
        onChange={() => onSwitch(identifier)}
        defaultChecked={checked === 1}
      />
    </div>
  );
};

export default Toggle;
