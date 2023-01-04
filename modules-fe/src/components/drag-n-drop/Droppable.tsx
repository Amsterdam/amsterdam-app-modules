import {ReactNode} from 'react'
import {Droppable as DroppableDnD} from 'react-beautiful-dnd'

type Props = {
  children: ReactNode
  droppableId: string
}

const Droppable = ({children, droppableId}: Props) => (
  <DroppableDnD droppableId={droppableId}>
    {(provided, snapshot) => (
      <div ref={provided.innerRef} {...provided.droppableProps}>
        {children}
        {provided.placeholder}
      </div>
    )}
  </DroppableDnD>
)

export default Droppable
