import styled from "styled-components";
import { Module } from "types/module";

const Container = styled.div`
  margin: 15px;
`;

const ModuleList = styled.div`
  padding: 8px;
`;

type Props = {
  modules: Array<Module>;
};

const ListModules = ({ modules }: Props) => {
  return (
    <Container>
      <ModuleList>
        {modules.map((module, index) => (
          <div
            key={module.slug}
            style={{
              color: "black",
              marginTop: 15,
              width: 324,
            }}
          >
            {module.title}
          </div>
        ))}
      </ModuleList>
    </Container>
  );
};

export default ListModules;
