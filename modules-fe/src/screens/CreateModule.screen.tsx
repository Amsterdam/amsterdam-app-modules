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
import ErrorScreen from '../components/ui/feedback/Error.screen'
import LoadingScreen from '../components/ui/feedback/Loading.screen'
import Column from '../components/ui/layout/Column'
import Screen from '../components/ui/layout/Screen'
import ScreenTitle from '../components/ui/text/ScreenTitle'
import {
  useCreateModuleMutation,
  useCreateModuleVersionMutation,
  useGetModuleQuery,
} from '../services/modules'
import {ModuleVersion} from '../types/module'

type Params = {
  slug?: string
}

const defaultModule: Omit<ModuleVersion, 'icon'> & {icon: ''} = {
  description: '',
  icon: '',
  moduleSlug: '',
  title: '',
  version: '0.0.0',
}

const CreateModuleScreen = () => {
  const navigate = useNavigate()

  const {slug} = useParams<Params>()
  const isNewModule = !slug
  const {data: module, isLoading: isGetModuleLoading} = useGetModuleQuery(
    slug
      ? {
          slug,
        }
      : skipToken,
  )
  const latestVersion =
    !isNewModule && module?.versions
      ? module.versions[module.versions.length - 1]
      : defaultModule

  const form = useForm<ModuleVersion>()
  const [createModule, {isLoading: isMutateModuleLoading}] =
    useCreateModuleMutation()
  const [createModuleVersion, {isLoading: isMutateModuleVersionLoading}] =
    useCreateModuleVersionMutation()
  const {handleSubmit, setValue} = form

  const createModuleVersionAndNavigate = useCallback(
    (data: ModuleVersion) => {
      createModuleVersion(data).then(response => {
        if ('data' in response) {
          navigate(`/module/${data.moduleSlug}`)
        }
      })
    },
    [createModuleVersion, navigate],
  )

  const onSubmitForm: SubmitHandler<ModuleVersion> = useCallback(
    data => {
      if (!data.moduleSlug) {
        return
      }
      if (isNewModule) {
        createModule({slug: data.moduleSlug, status: 1}).then(response => {
          if ('data' in response) {
            createModuleVersionAndNavigate({...data})
          }
        })
      } else {
        createModuleVersionAndNavigate({...data})
      }
    },
    [createModule, createModuleVersionAndNavigate, isNewModule],
  )
  useEffect(() => {
    if (latestVersion?.moduleSlug) {
      setValue('moduleSlug', latestVersion.moduleSlug)
    }
  }, [latestVersion.moduleSlug, setValue])

  if (
    isGetModuleLoading ||
    isMutateModuleLoading ||
    isMutateModuleVersionLoading
  ) {
    return <LoadingScreen />
  }

  if (!latestVersion) {
    return (
      <ErrorScreen message={`Geen versies gevonden van module ‘${slug}’.`} />
    )
  }

  const versionFieldValue = form.watch('version') ?? ''
  const titleFieldValue = form.watch('title') ?? latestVersion.title
  const addModuleText = `Nieuwe ${isNewModule ? 'module' : 'moduleversie'}`

  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle
          subtitle={!titleFieldValue ? undefined : addModuleText}
          title={
            !titleFieldValue
              ? addModuleText
              : `${titleFieldValue || 'Naam module'} ${versionFieldValue}`
          }
        />
        <FormProvider {...form}>
          <Column gutter="lg">
            {!!isNewModule && (
              <ModuleSlugField defaultValue={latestVersion.moduleSlug} />
            )}
            <ModuleTitleField defaultValue={latestVersion.title} />
            <ModuleDescriptionField defaultValue={latestVersion.description} />
            <ModuleIconField defaultValue={latestVersion.icon} />
            <VersionField baseVersion={latestVersion.version} />
            <Button label="Opslaan" onClick={handleSubmit(onSubmitForm)} />
          </Column>
        </FormProvider>
      </Column>
    </Screen>
  )
}

export default CreateModuleScreen
