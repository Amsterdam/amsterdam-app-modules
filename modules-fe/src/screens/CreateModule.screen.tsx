import {useCallback} from 'react'
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import ModuleSlugField from 'components/form-fields/ModuleSlugField'
import ModuleDescriptionField from '../components/form-fields/ModuleDescriptionField'
import ModuleIconField from '../components/form-fields/ModuleIconField'
import ModuleTitleField from '../components/form-fields/ModuleTitleField'
import VersionField from '../components/form-fields/VersionField'
import Button from '../components/ui/button/Button'
import LoadingBox from '../components/ui/feedback/LoadingBox'
import Column from '../components/ui/layout/Column'
import Screen from '../components/ui/layout/Screen'
import Title from '../components/ui/text/Title'
import {useCreateModuleMutation} from '../services/modules'
import {Module} from '../types/module'

const defaultModule: Module = {
  description: '',
  icon: 'alert',
  slug: '',
  status: 1,
  title: '',
  version: '0.0.0',
}

const CreateModuleScreen = () => {
  const navigate = useNavigate()

  const form = useForm<Module>()
  const [createModule, {isLoading}] = useCreateModuleMutation()
  const {handleSubmit} = form

  const onSubmitForm: SubmitHandler<Module> = useCallback(
    data => {
      if (!data.slug) {
        return
      }

      createModule({...data}).then(response => {
        if ('data' in response) {
          navigate(`/module/${data.slug}`)
        }
      })
    },
    [createModule, navigate],
  )

  const versionFieldValue = form.watch('version')
  const titleFieldValue = form.watch('title')

  if (isLoading) {
    return <LoadingBox />
  }

  return (
    <Screen>
      <Column gutter="lg">
        <Title>
          Module toevoegen: {titleFieldValue} {versionFieldValue}
        </Title>
        <FormProvider {...form}>
          <Column gutter="lg">
            <ModuleSlugField defaultValue={defaultModule.slug} />
            <ModuleTitleField defaultValue={defaultModule.title} />
            <ModuleDescriptionField defaultValue={defaultModule.description} />
            <ModuleIconField defaultValue={defaultModule.icon} />
            <VersionField baseVersion={defaultModule.version} />
            <Button label="Toevoegen" onClick={handleSubmit(onSubmitForm)} />
          </Column>
        </FormProvider>
      </Column>
    </Screen>
  )
}

export default CreateModuleScreen
