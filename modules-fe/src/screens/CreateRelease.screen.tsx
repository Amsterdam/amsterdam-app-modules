import {useEffect} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import DragDropModules from 'components/features/DragDropModules'
import VersionField from 'components/form-fields/VersionField'
import Button from 'components/ui/button/Button'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import LoadingScreen from 'screens/Loading.screen'
import {useGetLatestReleaseQuery} from 'services/releases'
import {
  selectRelease,
  selectReleaseVersion,
  setModules,
  setReleaseVersion,
} from 'slices/release.slice'
import {ReleaseBase} from 'types/release'

const CreateReleaseScreen = () => {
  const dispatch = useDispatch()
  const release = useSelector(selectRelease)
  const releaseVersion = useSelector(selectReleaseVersion)
  const form = useForm<Pick<ReleaseBase, 'version'>>()
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
    // eslint-disable-next-line no-console
    console.log(release) // TODO: POST release to API
  }

  if (isLoadingLatestRelease) {
    return <LoadingScreen />
  }

  if (!latestRelease) {
    return null
  }

  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle
          subtitle="Nieuwe release"
          title={`Amsterdam App ${releaseVersion ?? ''}`}
        />
        <FormProvider {...form}>
          <VersionField baseVersion={latestRelease.version} />
          <DragDropModules />
          <Button label="Opslaan" onClick={handleSubmit(onSubmitForm)} />
        </FormProvider>
      </Column>
    </Screen>
  )
}

export default CreateReleaseScreen
