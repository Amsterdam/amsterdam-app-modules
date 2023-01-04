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
        ref={provided.innerRef}
        {...provided.droppableProps}
        data-is-dragging-over={snapshot.isDraggingOver}>
        {children}
        {provided.placeholder}
      </div>
    )}
  </DroppableDnD>
)

export default Droppable
