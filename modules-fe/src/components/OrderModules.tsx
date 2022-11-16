import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Module } from "types/module";

const Container = styled.div`
  margin: 15px;
`;

const StyledModuleList = styled.ul`
  padding: "18px 0";
`;

type ModuleItemProps = {
  appversion: string;
  id: string;
  module: Module;
};

const ModuleItem = ({ appversion, id, module }: ModuleItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    color: "black",
    marginTop: 15,
    width: 324,
    display: "flex",
    justifyContent: "space-between",
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <li style={style} ref={setNodeRef} {...attributes} {...listeners}>
      {module.title}
      <Link to={`/edit-module/${appversion}/${module.slug}/${module.version}`}>
        <img
          style={{
            position: "absolute",
            right: "5px",
            marginTop: "3px",
          }}
          height="20px"
          src="/edit-blue.svg"
          alt="Bewerk module"
        />
      </Link>
    </li>
  );
};

type ModuleListProps = {
  appversion: string;
  list: Array<Module>;
};

const ModuleList = ({ appversion, list }: ModuleListProps) => (
  <StyledModuleList>
    {list.map((module) => (
      <ModuleItem
        appversion={appversion}
        id={module.slug}
        key={module.slug}
        module={module}
      />
    ))}
  </StyledModuleList>
);

type Props = {
  appversion: string;
  modules: Array<Module>;
  setModules: (modules: Array<Module>) => void;
};

const OrderModules = ({ appversion, modules, setModules }: Props) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const moduleActive = modules.find((m) => m.slug === active.id);
      const moduleOver = modules.find((m) => m.slug === over?.id);
      const oldIndex = moduleActive && modules.indexOf(moduleActive);
      const newIndex = moduleOver && modules.indexOf(moduleOver);

      if (typeof oldIndex === "number" && typeof newIndex === "number") {
        setModules(arrayMove(modules, oldIndex, newIndex));
      }
    }
  };

  return (
    <Container>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={modules.map((module) => ({ ...module, id: module.slug }))}
          strategy={verticalListSortingStrategy}
        >
          <ModuleList appversion={appversion} list={modules} />
        </SortableContext>
      </DndContext>
    </Container>
  );
};

export default OrderModules;
