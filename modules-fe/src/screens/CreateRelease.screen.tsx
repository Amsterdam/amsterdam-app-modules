import {useCallback, useEffect, useMemo} from 'react'
import {DragDropContext, DropResult} from 'react-beautiful-dnd'
import {FormProvider, useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import DraggableModules from 'components/features/DraggableModules'
import VersionField from 'components/form-fields/VersionField'
import Button from 'components/ui/button/Button'
import LoadingBox from 'components/ui/feedback/LoadingBox'
import Row from 'components/ui/layout/Row'
import {useGetModulesQuery} from 'services/modules'
import {useGetLatestReleaseQuery} from 'services/releases'
import {
  selectReleaseModules,
  setModules,
  setReleaseVersion,
} from 'slices/release.slice'
import {Release} from 'types/release'
import {addToList, removeFromList, reorderList} from 'utils/list'
import Column from '../components/ui/layout/Column'
import Grid from '../components/ui/layout/Grid'
import Screen from '../components/ui/layout/Screen'
import Title from '../components/ui/text/Title'

enum DroppableId {
  ActiveModules = 'droppableActiveModules',
  InactiveModules = 'droppableInactiveModules',
}

const CreateReleaseScreen = () => {
  const dispatch = useDispatch()
  const releaseModules = useSelector(selectReleaseModules)
  const form = useForm<Release>()
  const {data: latestRelease, isLoading: isLoadingLatestRelease} =
    useGetLatestReleaseQuery()
  const {data: modules, isLoading: isLoadingModules} = useGetModulesQuery()
  const watchVersion = form.watch('version')
  const inactiveModules = useMemo(
    () =>
      modules?.filter(
        module =>
          !releaseModules.find(
            releaseModule => releaseModule.slug === module.slug,
          ),
      ) ?? [],
    [modules, releaseModules],
  )

  useEffect(() => {
    dispatch(setReleaseVersion(watchVersion))
  }, [dispatch, watchVersion])

  useEffect(() => {
    if (latestRelease) dispatch(setModules(latestRelease.modules))
  }, [dispatch, latestRelease])

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

  if (isLoadingLatestRelease || isLoadingModules) {
    return <LoadingBox />
  }

  if (!latestRelease || !modules) {
    return null
  }

  return (
    <Screen>
      <Column gutter="lg">
        <Title>Toevoegen: Release</Title>
        <FormProvider {...form}>
          <VersionField baseVersion={latestRelease.version} />
        </FormProvider>
        <Column gutter="sm">
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
        <Row>
          <Button
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log('opslaan') // TODO: POST content of releaseSlice to /releases once ready
            }}
            label="Opslaan"
          />
        </Row>
      </Column>
    </Screen>
  )
}

export default CreateReleaseScreen
