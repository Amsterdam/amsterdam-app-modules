import {useCallback, useMemo} from 'react'
import {DragDropContext, DropResult} from 'react-beautiful-dnd'
import {useDispatch, useSelector} from 'react-redux'
import DraggableModules from 'components/features/DraggableModules'
import Column from 'components/ui/layout/Column'
import Grid from 'components/ui/layout/Grid'
import LoadingScreen from 'screens/Loading.screen'
import {useGetModulesAvailableForReleaseQuery} from 'services/modules'
import {selectReleaseModules, setModules} from 'slices/release.slice'
import {addToList, removeFromList, reorderList} from 'utils/list'

enum DroppableId {
  includedModules = 'includedModules',
  excludedModules = 'excludedModules',
}

type Props = {
  releaseVersion: string
}

const DragDropModules = ({releaseVersion}: Props) => {
  const dispatch = useDispatch()
  const releaseModules = useSelector(selectReleaseModules)
  const {data: modulesAvailableForRelease, isLoading: isLoadingModules} =
    useGetModulesAvailableForReleaseQuery(releaseVersion)

  const inactiveModules = useMemo(
    () =>
      modulesAvailableForRelease?.filter(
        module =>
          !releaseModules.find(
            activeModule =>
              activeModule.moduleSlug === module.moduleSlug &&
              activeModule.version === module.version,
          ),
      ) ?? [],
    [modulesAvailableForRelease, releaseModules],
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
        const draggingModule = inactiveModules[source.index]
        const items = addToList(
          releaseModules.filter(
            module => module.moduleSlug !== draggingModule.moduleSlug,
          ),
          destination.index,
          draggingModule,
        )
        dispatch(setModules(items))
      }
    },
    [dispatch, inactiveModules, releaseModules],
  )

  if (isLoadingModules) {
    return <LoadingScreen />
  }

  if (!modulesAvailableForRelease) {
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
