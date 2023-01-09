import {useCallback, useMemo} from 'react'
import {DragDropContext, DropResult} from 'react-beautiful-dnd'
import {useDispatch, useSelector} from 'react-redux'
import LoadingBox from 'components/ui/feedback/LoadingBox'
import Column from 'components/ui/layout/Column'
import Grid from 'components/ui/layout/Grid'
import {useGetModulesQuery} from 'services/modules'
import {selectReleaseModules, setModules} from 'slices/release.slice'
import {reorderList, removeFromList, addToList} from 'utils/list'
import DraggableModules from './DraggableModules'

enum DroppableId {
  ActiveModules = 'droppableActiveModules',
  InactiveModules = 'droppableInactiveModules',
}
const DragDropModules = () => {
  const dispatch = useDispatch()
  const releaseModules = useSelector(selectReleaseModules)
  const {data: modules, isLoading: isLoadingModules} = useGetModulesQuery()
  const inactiveModules = useMemo(
    () =>
      modules?.filter(
        module =>
          !releaseModules.find(
            activeModule => activeModule.slug === module.slug,
          ),
      ) ?? [],
    [modules, releaseModules],
  )

  const onDragEnd = useCallback(
    ({source, destination}: DropResult) => {
      if (!destination) {
        return
      }

      if (source.droppableId === destination.droppableId) {
        // dropped inside the same list
        if (destination.droppableId === DroppableId.ActiveModules) {
          // dropped inside the active modules list
          const items = reorderList(
            releaseModules,
            source.index,
            destination.index,
          )
          dispatch(setModules(items))
        }
      } else if (destination.droppableId === DroppableId.InactiveModules) {
        // dropped inside the inactive modules list
        const items = removeFromList(releaseModules, source.index)
        dispatch(setModules(items))
      } else if (destination.droppableId === DroppableId.ActiveModules) {
        // dropped inside the active modules list
        const items = addToList(
          releaseModules,
          destination.index,
          inactiveModules[source.index],
        )
        dispatch(setModules(items))
      }
    },
    [dispatch, inactiveModules, releaseModules],
  )

  if (isLoadingModules) {
    return <LoadingBox />
  }

  if (!modules) {
    return null
  }

  return (
    <Column gutter="md">
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid numColumns={2}>
          <DraggableModules
            droppableId={DroppableId.ActiveModules}
            modules={releaseModules}
          />
          <DraggableModules
            droppableId={DroppableId.InactiveModules}
            modules={inactiveModules}
            variant="inactive"
          />
        </Grid>
      </DragDropContext>
    </Column>
  )
}

export default DragDropModules
