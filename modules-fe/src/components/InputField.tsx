import { ChangeEventHandler } from "react";

type Props = {
  identifier: string;
  value: string | undefined;
} & (
  | {
      readonly?: false;
      setValue: (value: string) => void;
    }
  | {
      readonly: true;
      setValue?: (value: string) => void;
    }
);

const InputField = ({
  identifier,
  value = "",
  readonly = false,
  setValue = () => null,
}: Props) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  return (
    <input
      className="inputfield"
      type="text"
      id={identifier}
      name={identifier}
      readOnly={readonly}
      placeholder={identifier}
      onChange={handleChange}
      value={value}
    />
  );
};

export default InputField;
