import {useMemo} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import {useGetModulesQuery} from 'services/modules'
import {
  useCreateReleaseMutation,
  useGetLatestReleaseQuery,
} from 'services/releases'
import {selectReleaseModules} from 'slices/release.slice'
import {ModuleVersion} from 'types/module'
import {ReleaseBase, ReleaseWithModuleVersions} from 'types/release'
import ReleaseForm from '../components/features/ReleaseForm'
import ErrorScreen from './Error.screen'
import LoadingScreen from './Loading.screen'

const CreateReleaseScreen = () => {
  const releaseModules = useSelector(selectReleaseModules)
  const form = useForm<ReleaseBase>()
  const {watch} = form
  const releaseVersion = watch('version')
  const [createRelease] = useCreateReleaseMutation()
  const navigate = useNavigate()

  const {data: latestRelease, isLoading: isLoadingLatestRelease} =
    useGetLatestReleaseQuery()

  const {data: latestModules, isLoading: isLoadingLatestModules} =
    useGetModulesQuery()

  const releaseIfNoLatestRelease = useMemo(() => {
    if (!latestModules) {
      return null
    }
    return {
      created: '',
      modified: '',
      version: '0.15.0',
      published: null,
      unpublished: null,
      releaseNotes: '',
      modules: latestModules || ({} as ModuleVersion[]),
    }
  }, [latestModules])

  const handleCreateRelease = async (data: ReleaseBase) => {
    const preparedData = {
      ...data,
      modules: releaseModules.map(({moduleSlug, version}) => ({
        moduleSlug,
        version,
        status: 1,
      })),
    }
    const result = await createRelease(preparedData)
    if ('data' in result) {
      navigate('/releases')
    }
  }

  if (isLoadingLatestRelease || isLoadingLatestModules) {
    return <LoadingScreen />
  }

  if (!latestRelease && !releaseIfNoLatestRelease) {
    return (
      <ErrorScreen message="Er zijn geen modules die aan een release toegevoegd kunnen worden." />
    )
  }

  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle
          subtitle="Nieuwe release"
          title={`Amsterdam App ${releaseVersion ?? ''}`}
        />
        <FormProvider {...form}>
          <ReleaseForm
            onSubmit={handleCreateRelease}
            release={
              latestRelease ||
              releaseIfNoLatestRelease ||
              ({} as ReleaseWithModuleVersions)
            }
          />
        </FormProvider>
      </Column>
    </Screen>
  )
}

export default CreateReleaseScreen
