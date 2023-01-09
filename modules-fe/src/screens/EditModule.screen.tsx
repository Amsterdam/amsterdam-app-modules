import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback} from 'react'
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form'
import {useNavigate, useParams} from 'react-router-dom'
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
import {useEditModuleMutation, useGetModuleQuery} from '../services/modules'
import {ModuleVersion} from '../types/module'

type Params = {
  slug: string
  version: string
}

const EditModuleScreen = () => {
  const navigate = useNavigate()

  const {slug, version} = useParams<Params>()
  const {data: module, isLoading} = useGetModuleQuery(
    slug
      ? {
          slug,
        }
      : skipToken,
  )
  const moduleVersion = module?.versions.find(m => m.version === version)

  const form = useForm<ModuleVersion>()
  const [editModule] = useEditModuleMutation()
  const {handleSubmit} = form

  const onSubmitForm: SubmitHandler<ModuleVersion> = useCallback(
    data => {
      if (!slug) {
        return
      }

      editModule({...data, moduleSlug: slug}).then(response => {
        if ('data' in response) {
          navigate(`/module/${slug}`)
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
            <VersionField
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
