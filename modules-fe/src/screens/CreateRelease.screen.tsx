import {useCallback, useEffect, useMemo} from 'react'
import {DropResult} from 'react-beautiful-dnd'
import {FormProvider, useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import DragDropContext from 'components/drag-n-drop/DragDropContext'
import Draggable from 'components/drag-n-drop/Draggable'
import Droppable from 'components/drag-n-drop/Droppable'
import VersionField from 'components/form-fields/VersionField'
import LoadingBox from 'components/ui/feedback/LoadingBox'
import Box from 'components/ui/layout/Box'
import Row from 'components/ui/layout/Row'
import Icon from 'components/ui/media/Icon'
import List from 'components/ui/text/List'
import ListItem from 'components/ui/text/ListItem'
import Phrase from 'components/ui/text/Phrase'
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
      <FormProvider {...form}>
        <Column gutter="lg">
          <Title>Toevoegen: Release</Title>
          <VersionField baseVersion={latestRelease.version} />
          <Column gutter="sm">
            <DragDropContext onDragEnd={onDragEnd}>
              <Row>
                <div style={{flex: 1}}>
                  <Phrase color="muted">Actieve Modules</Phrase>
                  <Box inset="no" negativeInsetHorizontal="md">
                    <Droppable droppableId={DroppableId.ActiveModules}>
                      <List>
                        {releaseModules.map(
                          ({icon, slug, title, version}, index) => (
                            <Draggable
                              key={slug}
                              draggableId={slug}
                              index={index}>
                              <ListItem>
                                <Box>
                                  <Row gutter="sm" valign="baseline">
                                    <Icon name={icon} />
                                    <Phrase>{title}</Phrase>
                                    <Phrase>{`- v.${version}`}</Phrase>
                                  </Row>
                                </Box>
                              </ListItem>
                            </Draggable>
                          ),
                        )}
                      </List>
                    </Droppable>
                  </Box>
                </div>
                <div style={{flex: 1}}>
                  <Phrase color="muted">Inactieve Modules</Phrase>
                  <Box inset="no" negativeInsetHorizontal="md">
                    <Droppable droppableId={DroppableId.InactiveModules}>
                      <List>
                        {inactiveModules.map(({slug, title, icon}, index) => (
                          <Draggable
                            key={slug}
                            draggableId={slug}
                            index={index}>
                            <ListItem>
                              <Box>
                                <Row gutter="sm" valign="baseline">
                                  <Icon name={icon} fill="muted" />
                                  <Phrase color="muted">{title}</Phrase>
                                </Row>
                              </Box>
                            </ListItem>
                          </Draggable>
                        ))}
                      </List>
                    </Droppable>
                  </Box>
                </div>
              </Row>
            </DragDropContext>
          </Column>
        </Column>
      </FormProvider>
    </Screen>
  )
}

export default CreateReleaseScreen
