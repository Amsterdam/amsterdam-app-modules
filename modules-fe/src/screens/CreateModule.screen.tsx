import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback, useEffect} from 'react'
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form'
import {useNavigate, useParams} from 'react-router-dom'
import ModuleSlugField from 'components/form-fields/ModuleSlugField'
import ModuleDescriptionField from '../components/form-fields/ModuleDescriptionField'
import ModuleIconField from '../components/form-fields/ModuleIconField'
import ModuleTitleField from '../components/form-fields/ModuleTitleField'
import VersionField from '../components/form-fields/VersionField'
import Button from '../components/ui/button/Button'
import ErrorBox from '../components/ui/feedback/ErrorBox'
import LoadingBox from '../components/ui/feedback/LoadingBox'
import Column from '../components/ui/layout/Column'
import Screen from '../components/ui/layout/Screen'
import Title from '../components/ui/text/Title'
import {useCreateModuleMutation, useGetModuleQuery} from '../services/modules'
import {ModuleVersion} from '../types/module'

type Params = {
  slug?: string
}

const defaultModule: Omit<ModuleVersion, 'icon'> & {icon: undefined} = {
  description: '',
  icon: undefined,
  moduleSlug: '',
  title: '',
  version: '0.0.0',
}

const CreateModuleScreen = () => {
  const navigate = useNavigate()

  const {slug} = useParams<Params>()
  const isNewModule = !slug
  const {data: module, isLoading} = useGetModuleQuery(
    slug
      ? {
          slug,
        }
      : skipToken,
  )
  const latestVersion =
    !isNewModule && module ? module.versions[0] : defaultModule

  const form = useForm<ModuleVersion>()
  const [createModule, {isLoading: isMutateLoading}] = useCreateModuleMutation()
  const {handleSubmit, setValue} = form

  const onSubmitForm: SubmitHandler<ModuleVersion> = useCallback(
    data => {
      if (!data.moduleSlug) {
        return
      }

      createModule({...data}).then(response => {
        if ('data' in response) {
          navigate(`/module/${data.moduleSlug}`)
        }
      })
    },
    [createModule, navigate],
  )
  useEffect(() => {
    if (latestVersion.moduleSlug) {
      setValue('moduleSlug', latestVersion.moduleSlug)
    }
  }, [latestVersion.moduleSlug, setValue])

  const versionFieldValue = form.watch('version') ?? ''
  const titleFieldValue = form.watch('title') ?? ''

  if (isLoading || isMutateLoading) {
    return <LoadingBox />
  }

  if (!latestVersion) {
    return <ErrorBox message={`Geen versies gevonden van module ‘${slug}’.`} />
  }

  return (
    <Screen>
      <Column gutter="lg">
        <Title>
          Toevoegen module{!isNewModule && 'versie'}: {titleFieldValue}{' '}
          {versionFieldValue}
        </Title>
        <FormProvider {...form}>
          <Column gutter="lg">
            {isNewModule && (
              <ModuleSlugField defaultValue={latestVersion.moduleSlug} />
            )}
            <ModuleTitleField defaultValue={latestVersion.title} />
            <ModuleDescriptionField defaultValue={latestVersion.description} />
            <ModuleIconField defaultValue={latestVersion.icon} />
            <VersionField baseVersion={latestVersion.version} />
            <Button label="Toevoegen" onClick={handleSubmit(onSubmitForm)} />
          </Column>
        </FormProvider>
      </Column>
    </Screen>
  )
}

export default CreateModuleScreen
