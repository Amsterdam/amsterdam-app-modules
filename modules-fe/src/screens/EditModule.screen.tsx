import {useCallback} from 'react'
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form'
import {useNavigate, useParams} from 'react-router-dom'
import ErrorBox from 'components/ui/feedback/ErrorBox'
import LoadingBox from 'components/ui/feedback/LoadingBox'
import {useEditModuleMutation, useGetModuleQuery} from 'services/modules'
import ModuleDescriptionField from '../components/form-fields/ModuleDescriptionField'
import ModuleIconField from '../components/form-fields/ModuleIconField'
import ModuleTitleField from '../components/form-fields/ModuleTitleField'
import ModuleVersionField from '../components/form-fields/ModuleVersionField'
import Button from '../components/ui/button/Button'
import Column from '../components/ui/layout/Column'
import Screen from '../components/ui/layout/Screen'
import Title from '../components/ui/text/Title'
import {Module, ModuleSlug} from '../types/module'

type Params = {
  slug: ModuleSlug
  version: string
}

const EditModuleScreen = () => {
  const navigate = useNavigate()

  const {slug, version}: Partial<Params> = useParams()
  const {data: module, isLoading} = useGetModuleQuery({
    slug: slug as ModuleSlug,
  })
  const moduleVersion = module?.find(m => m.version === version)

  const form = useForm<Module>()
  const [editModule] = useEditModuleMutation()
  const {handleSubmit} = form

  const onSubmitForm: SubmitHandler<Module> = useCallback(
    data => {
      if (!slug) {
        return
      }

      editModule({...data, slug}).then(response => {
        if ('data' in response) {
          navigate(`/modules/${slug}`)
        }
      })
    },
    [editModule, navigate, slug],
  )

  if (isLoading) {
    return <LoadingBox />
  }

  if (!moduleVersion) {
    return (
      <ErrorBox
        message={`Versie ${version} van module ‘${slug}’ niet gevonden.`}
      />
    )
  }

  return (
    <Screen>
      <Column gutter="lg">
        <Title>
          Bewerken: {moduleVersion.title} {moduleVersion.version}
        </Title>
        <FormProvider {...form}>
          <Column gutter="lg">
            <ModuleTitleField defaultValue={moduleVersion.title} />
            <ModuleDescriptionField defaultValue={moduleVersion.description} />
            <ModuleIconField defaultValue={moduleVersion.icon} />
            <ModuleVersionField
              baseVersion={moduleVersion.version}
              defaultValue={moduleVersion.version}
            />
            <Button label="Opslaan" onClick={handleSubmit(onSubmitForm)} />
          </Column>
        </FormProvider>
      </Column>
    </Screen>
  )
}

export default EditModuleScreen
