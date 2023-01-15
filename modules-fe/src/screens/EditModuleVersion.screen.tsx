import {skipToken} from '@reduxjs/toolkit/query'
import {FormProvider, useForm} from 'react-hook-form'
import {useNavigate, useParams} from 'react-router-dom'
import {ModuleVersion} from 'types/module'
import ModuleDescriptionField from '../components/form-fields/ModuleDescriptionField'
import ModuleIconField from '../components/form-fields/ModuleIconField'
import ModuleTitleField from '../components/form-fields/ModuleTitleField'
import VersionField from '../components/form-fields/VersionField'
import Button from '../components/ui/button/Button'
import ErrorBox from '../components/ui/feedback/ErrorBox'
import LoadingBox from '../components/ui/feedback/LoadingBox'
import Column from '../components/ui/layout/Column'
import Screen from '../components/ui/layout/Screen'
import ScreenTitle from '../components/ui/text/ScreenTitle'
import {
  useEditModuleVersionMutation,
  useGetModuleQuery,
} from '../services/modules'

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
  const [editModuleVersion] = useEditModuleVersionMutation()
  const {handleSubmit, formState} = form
  const {dirtyFields} = formState

  const onSubmitForm = (data: ModuleVersion) => {
    const dirtyFieldsOnly: Partial<ModuleVersion> = {}
    const dirtyFieldKeys = Object.keys(dirtyFields) as Array<
      keyof ModuleVersion
    >

    if (!slug || !version) {
      return
    }

    if (!dirtyFieldKeys.length) {
      navigate(`/module/${slug}`)
    } else {
      dirtyFieldKeys.forEach(<K extends keyof ModuleVersion>(field: K) => {
        dirtyFieldsOnly[field] = data[field]
      })

      editModuleVersion({
        ...dirtyFieldsOnly,
        moduleSlug: slug,
        pathVersion: version,
      }).then(response => {
        if ('data' in response) {
          navigate(`/module/${slug}`)
        }
      })
    }
  }

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
        <ScreenTitle
          subtitle="Moduleversie"
          title={`${moduleVersion.title} ${moduleVersion.version}`}
        />
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
            {!!moduleVersion.statusInReleases?.length && (
              <Button
                label="Aan- of uitzetten"
                onClick={() => navigate(`/module/${slug}/${version}/status`)}
                variant="secondary"
              />
            )}
          </Column>
        </FormProvider>
      </Column>
    </Screen>
  )
}

export default EditModuleScreen
