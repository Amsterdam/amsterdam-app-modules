import {FormProvider, useForm} from 'react-hook-form'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import {
  useCreateReleaseMutation,
  useGetLatestReleaseQuery,
} from 'services/releases'
import {selectReleaseModules} from 'slices/release.slice'
import {ReleaseBase} from 'types/release'
import ReleaseForm from '../components/features/ReleaseForm'

const CreateReleaseScreen = () => {
  const releaseModules = useSelector(selectReleaseModules)
  const form = useForm<ReleaseBase>()
  const {watch} = form
  const releaseVersion = watch('version')
  const [createRelease] = useCreateReleaseMutation()
  const navigate = useNavigate()

  const {data: release, isLoading} = useGetLatestReleaseQuery()

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

  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle
          subtitle="Nieuwe release"
          title={`Amsterdam App ${releaseVersion ?? ''}`}
        />
        <FormProvider {...form}>
          <ReleaseForm
            isLoading={isLoading}
            onSubmit={handleCreateRelease}
            release={release}
          />
        </FormProvider>
      </Column>
    </Screen>
  )
}

export default CreateReleaseScreen
