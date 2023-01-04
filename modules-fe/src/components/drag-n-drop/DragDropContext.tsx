import {ReactNode} from 'react'
import {
  DragDropContext as DragDropContextDnD,
  DropResult,
} from 'react-beautiful-dnd'

type Props = {
  children: ReactNode
  onDragEnd: (result: DropResult) => void
}

const DragDropContext = ({children, onDragEnd}: Props) => {
  return (
    <DragDropContextDnD onDragEnd={onDragEnd}>{children}</DragDropContextDnD>
  )
}

export default DragDropContext
