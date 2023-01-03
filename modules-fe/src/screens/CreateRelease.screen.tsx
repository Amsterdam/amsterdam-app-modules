import {useEffect} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useDispatch} from 'react-redux'
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
import {setModules, setReleaseVersion} from 'slices/release.slice'
import {Release} from 'types/release'
import Column from '../components/ui/layout/Column'
import Screen from '../components/ui/layout/Screen'
import Title from '../components/ui/text/Title'

const CreateReleaseScreen = () => {
  const dispatch = useDispatch()
  const form = useForm<Release>()
  const {data: latestRelease, isLoading: isLoadingLatestRelease} =
    useGetLatestReleaseQuery()
  const {data: modules, isLoading: isLoadingModules} = useGetModulesQuery()
  const watchVersion = form.watch('version')

  useEffect(() => {
    dispatch(setReleaseVersion(watchVersion))
  }, [dispatch, watchVersion])

  useEffect(() => {
    if (latestRelease) dispatch(setModules(latestRelease.modules))
  }, [dispatch, latestRelease])

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
            <Phrase color="muted">Modules</Phrase>
            <Box inset="no" negativeInsetHorizontal="md">
              <List>
                {latestRelease.modules.map(({slug, title, icon}) => (
                  <ListItem key={slug}>
                    <Box>
                      <Row gutter="sm" valign="baseline">
                        <Icon name={icon} />
                        <Phrase>{title}</Phrase>
                      </Row>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Column>
        </Column>
      </FormProvider>
    </Screen>
  )
}

export default CreateReleaseScreen
