import styled from "styled-components";
import { Module } from "types/module";
import Toggle from "./Toggle";

const Container = styled.div`
  margin: 15px;
`;

const ModuleList = styled.div`
  padding: 8px;
`;

type ModuleProps = {
  title: string;
  identifier: string;
  checked: number;
  onSwitch: (identifier: string) => void;
};

const ModuleToggle = ({
  title,
  checked,
  onSwitch,
  identifier,
}: ModuleProps) => {
  return (
    <div
      style={{
        color: "black",
        marginTop: 15,
        width: 324,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {title}
      <div>
        <Toggle
          key={identifier}
          checked={checked}
          onSwitch={onSwitch}
          identifier={identifier}
        />
      </div>
    </div>
  );
};

type Props = {
  modules: Module[];
  onSwitch: (identifier: string) => void;
};

const EnableDisableModules = ({ modules, onSwitch }: Props) => {
  return (
    <Container>
      <ModuleList>
        {modules.map((module, index: number) => (
          <ModuleToggle
            key={module.slug}
            title={module.title}
            checked={module.status}
            onSwitch={onSwitch}
            identifier={module.slug}
          />
        ))}
      </ModuleList>
    </Container>
  );
};

export default EnableDisableModules;
