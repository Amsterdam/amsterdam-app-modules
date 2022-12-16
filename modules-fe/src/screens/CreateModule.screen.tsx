import {useCallback} from 'react'
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form'
import {useNavigate, useParams} from 'react-router-dom'
import ModuleDescriptionField from '../components/form-fields/ModuleDescriptionField'
import ModuleIconField from '../components/form-fields/ModuleIconField'
import ModuleTitleField from '../components/form-fields/ModuleTitleField'
import ModuleVersionField from '../components/form-fields/ModuleVersionField'
import Button from '../components/ui/button/Button'
import ErrorBox from '../components/ui/feedback/ErrorBox'
import LoadingBox from '../components/ui/feedback/LoadingBox'
import Column from '../components/ui/layout/Column'
import Screen from '../components/ui/layout/Screen'
import Title from '../components/ui/text/Title'
import {useCreateModuleMutation, useGetModuleQuery} from '../services/modules'
import {Module, ModuleSlug} from '../types/module'

type Params = {
  slug: ModuleSlug
}

const CreateModuleScreen = () => {
  const navigate = useNavigate()

  const {slug}: Partial<Params> = useParams()
  const {data: module, isLoading} = useGetModuleQuery({
    slug: slug as ModuleSlug,
  })
  const latestVersion = module?.[0]

  const form = useForm<Module>()
  const [createModule] = useCreateModuleMutation()
  const {handleSubmit} = form

  const onSubmitForm: SubmitHandler<Module> = useCallback(
    data => {
      if (!slug) {
        return
      }

      createModule({...data, slug}).then(response => {
        if ('data' in response) {
          navigate(`/modules/${slug}`)
        }
      })
    },
    [createModule, navigate, slug],
  )

  const versionFieldValue = form.watch('version')

  if (isLoading) {
    return <LoadingBox />
  }

  if (!latestVersion) {
    return <ErrorBox message={`Geen versies gevonden van module ‘${slug}’.`} />
  }

  return (
    <Screen>
      <Column gutter="lg">
        <Title>
          Toevoegen: {latestVersion.title} {versionFieldValue}
        </Title>
        <FormProvider {...form}>
          <Column gutter="lg">
            <ModuleTitleField defaultValue={latestVersion.title} />
            <ModuleDescriptionField defaultValue={latestVersion.description} />
            <ModuleIconField defaultValue={latestVersion.icon} />
            <ModuleVersionField baseVersion={latestVersion.version} />
            <Button label="Toevoegen" onClick={handleSubmit(onSubmitForm)} />
          </Column>
        </FormProvider>
      </Column>
    </Screen>
  )
}

export default CreateModuleScreen
