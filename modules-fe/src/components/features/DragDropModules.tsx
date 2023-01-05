import {useCallback, useMemo} from 'react'
import {DragDropContext, DropResult} from 'react-beautiful-dnd'
import {useDispatch, useSelector} from 'react-redux'
import Button from 'components/ui/button/Button'
import LoadingBox from 'components/ui/feedback/LoadingBox'
import Column from 'components/ui/layout/Column'
import Grid from 'components/ui/layout/Grid'
import Row from 'components/ui/layout/Row'
import {useGetModulesQuery} from 'services/modules'
import {selectReleaseModules, setModules} from 'slices/release.slice'
import {reorderList, removeFromList, addToList} from 'utils/list'
import DraggableModules from './DraggableModules'

enum DroppableId {
  ActiveModules = 'droppableActiveModules',
  InactiveModules = 'droppableInactiveModules',
}

type Props = {
  onSave: () => void
}

const DragDropModules = ({onSave}: Props) => {
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

      // dropped inside the same list
      if (source.droppableId === destination.droppableId) {
        // dropped inside the active modules list
        if (destination.droppableId === DroppableId.ActiveModules) {
          const items = reorderList(
            releaseModules,
            source.index,
            destination.index,
          )
          dispatch(setModules(items))
        }

        // dropped inside the inactive modules list
      } else if (destination.droppableId === DroppableId.InactiveModules) {
        const items = removeFromList(releaseModules, source.index)
        dispatch(setModules(items))

        // dropped inside the active modules list
      } else if (destination.droppableId === DroppableId.ActiveModules) {
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
      <Row>
        <Button onClick={onSave} label="Opslaan" />
      </Row>
    </Column>
  )
}

export default DragDropModules
