import {FormProvider, useForm} from 'react-hook-form'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {
  useCreateReleaseMutation,
  useGetLatestReleaseQuery,
} from 'services/releases'
import {selectReleaseModules} from 'slices/release.slice'
import {ReleaseBase} from 'types/release'
import ReleaseScreen from './Release.screen'

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
    <FormProvider {...form}>
      <ReleaseScreen
        isLoading={isLoading}
        onSubmit={handleCreateRelease}
        release={release}
        subtitle="Nieuwe release"
        title={`Amsterdam App ${releaseVersion ?? ''}`}
      />
    </FormProvider>
  )
}

export default CreateReleaseScreen
