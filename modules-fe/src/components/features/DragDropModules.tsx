import {useCallback, useMemo} from 'react'
import {DragDropContext, DropResult} from 'react-beautiful-dnd'
import {useDispatch, useSelector} from 'react-redux'
import DraggableModules from 'components/features/DraggableModules'
import Column from 'components/ui/layout/Column'
import Grid from 'components/ui/layout/Grid'
import LoadingScreen from 'screens/Loading.screen'
import {useGetModulesQuery} from 'services/modules'
import {selectReleaseModules, setModules} from 'slices/release.slice'
import {addToList, removeFromList, reorderList} from 'utils/list'

enum DroppableId {
  includedModules = 'includedModules',
  excludedModules = 'excludedModules',
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
            activeModule => activeModule.moduleSlug === module.moduleSlug,
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
        if (destination.droppableId === DroppableId.includedModules) {
          // dropped inside the active modules list
          const items = reorderList(
            releaseModules,
            source.index,
            destination.index,
          )
          dispatch(setModules(items))
        }
      } else if (destination.droppableId === DroppableId.excludedModules) {
        // dropped inside the inactive modules list
        const items = removeFromList(releaseModules, source.index)
        dispatch(setModules(items))
      } else if (destination.droppableId === DroppableId.includedModules) {
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
    return <LoadingScreen />
  }

  if (!modules) {
    return null
  }

  return (
    <Column gutter="md">
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid numColumns={2}>
          <DraggableModules
            droppableId={DroppableId.includedModules}
            modules={releaseModules}
          />
          <DraggableModules
            droppableId={DroppableId.excludedModules}
            modules={inactiveModules}
            variant="inactive"
          />
        </Grid>
      </DragDropContext>
    </Column>
  )
}

export default DragDropModules
