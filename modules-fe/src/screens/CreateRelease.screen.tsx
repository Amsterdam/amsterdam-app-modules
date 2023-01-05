import {useEffect} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import DragDropModules from 'components/features/DragDropModules'
import VersionField from 'components/form-fields/VersionField'
import LoadingBox from 'components/ui/feedback/LoadingBox'
import {useGetLatestReleaseQuery} from 'services/releases'
import {
  selectRelease,
  setModules,
  setReleaseVersion,
} from 'slices/release.slice'
import {Release} from 'types/release'
import Column from '../components/ui/layout/Column'
import Screen from '../components/ui/layout/Screen'
import Title from '../components/ui/text/Title'

const CreateReleaseScreen = () => {
  const dispatch = useDispatch()
  const release = useSelector(selectRelease)
  const form = useForm<Pick<Release, 'version'>>()
  const {handleSubmit} = form
  const {data: latestRelease, isLoading: isLoadingLatestRelease} =
    useGetLatestReleaseQuery()
  const watchVersion = form.watch('version')

  useEffect(() => {
    dispatch(setReleaseVersion(watchVersion))
  }, [dispatch, watchVersion])

  useEffect(() => {
    if (latestRelease) dispatch(setModules(latestRelease.modules))
  }, [dispatch, latestRelease])

  const onSubmitForm = () => {
    console.log(release) // TODO: POST release to API
  }

  if (isLoadingLatestRelease) {
    return <LoadingBox />
  }

  if (!latestRelease) {
    return null
  }

  return (
    <Screen>
      <Column gutter="lg">
        <Title>Toevoegen: Release</Title>
        <FormProvider {...form}>
          <VersionField baseVersion={latestRelease.version} />
          <DragDropModules onSave={handleSubmit(onSubmitForm)} />
        </FormProvider>
      </Column>
    </Screen>
  )
}

export default CreateReleaseScreen
