import {ReactNode} from 'react'
import {Droppable as DroppableDnD} from 'react-beautiful-dnd'
import './Droppable.css'

type Props = {
  children: ReactNode
  droppableId: string
}

const Droppable = ({children, droppableId}: Props) => (
  <DroppableDnD droppableId={droppableId}>
    {(provided, snapshot) => (
      <div
        className="Droppable"
        ref={provided.innerRef}
        data-is-dragging-over={snapshot.isDraggingOver}
        {...provided.droppableProps}>
        {children}
        {provided.placeholder}
      </div>
    )}
  </DroppableDnD>
)

export default Droppable
