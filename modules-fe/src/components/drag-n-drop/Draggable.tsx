import {ReactNode} from 'react'
import {
  Draggable as DraggableDnD,
  DraggingStyle,
  NotDraggingStyle,
} from 'react-beautiful-dnd'
import './Draggable.css'

const getItemStyle = (draggableStyle?: DraggingStyle | NotDraggingStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,
})

type Props = {
  children: ReactNode
  draggableId: string
  index: number
  key: string
}

const Draggable = ({children, ...props}: Props) => (
  <DraggableDnD {...props}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        data-is-dragging={snapshot.isDragging}
        style={getItemStyle(provided.draggableProps.style)}>
        {children}
      </div>
    )}
  </DraggableDnD>
)

export default Draggable
