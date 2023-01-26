import {useEffect} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import DragDropModules from 'components/features/DragDropModules'
import VersionField from 'components/form-fields/VersionField'
import Button from 'components/ui/button/Button'
import TextField from 'components/ui/forms/TextField'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import LoadingScreen from 'screens/Loading.screen'
import {
  useCreateReleaseMutation,
  useGetLatestReleaseQuery,
} from 'services/releases'
import {selectReleaseModules, setModules} from 'slices/release.slice'
import {ReleaseBase} from 'types/release'

const CreateReleaseScreen = () => {
  const dispatch = useDispatch()
  const releaseModules = useSelector(selectReleaseModules)
  const form = useForm<ReleaseBase>()
  const {handleSubmit, watch} = form
  const {data: latestRelease, isLoading: isLoadingLatestRelease} =
    useGetLatestReleaseQuery()
  const releaseVersion = watch('version')
  const [createRelease] = useCreateReleaseMutation()
  const navigate = useNavigate()

  useEffect(() => {
    if (latestRelease) dispatch(setModules(latestRelease.modules))
  }, [dispatch, latestRelease])

  const onSubmitForm = async (data: ReleaseBase) => {
    const result = await createRelease({...data, modules: releaseModules})
    if ('data' in result) {
      navigate('/releases')
    }
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
          <Column gutter="lg">
            <VersionField baseVersion={latestRelease.version} />
            <DragDropModules />
            <TextField
              label="Gepubliceerd"
              name="published"
              type="date"
              width="half"
            />
            <TextField
              label="Ongepubliceerd"
              name="unpublished"
              type="date"
              width="half"
            />
            <TextField label="Release notes" name="releaseNotes" />
            <Button label="Opslaan" onClick={handleSubmit(onSubmitForm)} />
          </Column>
        </FormProvider>
      </Column>
    </Screen>
  )
}

export default CreateReleaseScreen
