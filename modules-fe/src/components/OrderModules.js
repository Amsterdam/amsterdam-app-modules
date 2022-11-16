import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useDraggable,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import { useState } from 'react';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Container = styled.div`
    margin: 15px;
`;

const StyledModuleList = styled.ul`
    padding: '18px 0';
`;

const Module = ({ appversion, id, module }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        color: 'black',
        marginTop: 15,
        width: 324,
        display: 'flex',
        justifyContent: 'space-between',
        transform: CSS.Transform.toString(transform),
        transition
    };
    return (
        <li style={style} ref={setNodeRef} {...attributes} {...listeners}>
            {module.title}
            <Link to={`/edit-module/${appversion}/${module.slug}/${module.version}`}>
                <img
                    style={{
                        position: 'absolute',
                        right: '5px',
                        marginTop: '3px'
                    }}
                    height={'20px'}
                    src="/edit-blue.svg"
                    alt="Bewerk module"
                />
            </Link>
        </li>
    );
};

const ModuleList = ({ appversion, list }) => (
    <StyledModuleList>
        {list.map(module => (
            <Module appversion={appversion} id={module.slug} key={module.slug} module={module} />
        ))}
    </StyledModuleList>
);

const OrderModules = ({ appversion, modules, setModules }) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const handleDragEnd = event => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setModules(modules => {
                const moduleActive = modules.find(m => m.slug === active.id);
                const moduleOver = modules.find(m => m.slug === over.id);
                const oldIndex = modules.indexOf(moduleActive);
                const newIndex = modules.indexOf(moduleOver);

                return arrayMove(modules, oldIndex, newIndex);
            });
        }
    };

    return (
        <Container>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={modules} strategy={verticalListSortingStrategy}>
                    <ModuleList appversion={appversion} list={modules} />
                </SortableContext>
            </DndContext>
        </Container>
    );
};

export default OrderModules;
