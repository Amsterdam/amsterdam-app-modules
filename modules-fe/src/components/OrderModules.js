import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'


const Container = styled.div`
    margin: 15px;
`;

const ModuleList = styled.ul`
    padding: 8px;
`;

const Module = (props) => {
    return (
        <Draggable key={props.module.slug} draggableId={props.module.slug} index={props.index}>
            {(provided) => (
                <li
                    ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                    style={{
                        color: 'black',
                        marginTop: 15,
                        width: 324,
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                    {props.module.title}
                    <div>
                        <Link to={`/edit-module/${props.appversion}/${props.module.slug}/${props.module.version}`}>
                            <img
                                style={{
                                    position: 'absolute',
                                    right: '5px',
                                    marginTop: '3px',
                                }}
                                height={'20px'}
                                src='/edit-blue.svg'
                                alt='Bewerk module' />
                        </Link>
                    </div>
                </li>
            )}
        </Draggable>
    )
}

const OrderModules = (props) => {
    return (
        <Container>
            <DragDropContext>
                <Droppable droppableId="moduleOrder">
                    {(provided) => (
                        <ModuleList id='moduleOrder' className='moduleOrder' {...provided.droppableProps} ref={provided.innerRef}>
                            {props.modules.map((module, index) => {
                                return (
                                    <Module
                                        key={module.slug}
                                        index={index}
                                        appversion={props.appversion}
                                        module={module} />
                                );
                            })}
                            {provided.placeholder}
                        </ModuleList>
                    )}
                </Droppable>
            </DragDropContext>
        </Container>
    )
}

export default OrderModules