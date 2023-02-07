import {skipToken} from '@reduxjs/toolkit/query'
import {useState} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useNavigate, useParams} from 'react-router-dom'
import LoadingButton from 'components/features/LoadingButton'
import ModuleDescriptionField from 'components/form-fields/ModuleDescriptionField'
import ModuleIconField from 'components/form-fields/ModuleIconField'
import ModuleTitleField from 'components/form-fields/ModuleTitleField'
import VersionField from 'components/form-fields/VersionField'
import Button from 'components/ui/button/Button'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import ErrorScreen from 'screens/Error.screen'
import LoadingScreen from 'screens/Loading.screen'
import {
  useDeleteModuleVersionMutation,
  useEditModuleVersionMutation,
  useGetModuleVersionQuery,
} from 'services/modules'
import {ModuleVersion} from 'types/module'

type Params = {
  slug: string
  version: string
}

const EditModuleScreen = () => {
  const navigate = useNavigate()

  const {slug: slugParam, version: versionParam} = useParams<Params>()
  const [isBeforeNavigation, setIsBeforeNavigation] = useState(false)
  const {data: moduleVersion, isLoading} = useGetModuleVersionQuery(
    slugParam && versionParam && !isBeforeNavigation
      ? {
          slug: slugParam,
          version: versionParam,
        }
      : skipToken,
  )
  const isInRelease = moduleVersion?.statusInReleases?.length

  const form = useForm<ModuleVersion>()
  const [
    editModuleVersion,
    {isLoading: isEditingModuleVersion, error: editingModuleError},
  ] = useEditModuleVersionMutation()
  const [
    deleteModuleVersion,
    {isLoading: isDeletingModule, error: deletingModuleError},
  ] = useDeleteModuleVersionMutation()
  const {handleSubmit, formState} = form
  const {dirtyFields} = formState

  const handleRemoveModuleVersion = () => {
    if (!moduleVersion) {
      return
    }
    const {moduleSlug, version, title} = moduleVersion
    if (
      // eslint-disable-next-line no-alert
      window.confirm(
        `Weet je zeker dat je module ‘${title}’ v${version} wil verwijderen?`,
      )
    ) {
      setIsBeforeNavigation(true)
      deleteModuleVersion({
        moduleSlug,
        version,
      })
        .unwrap()
        .then(() => {
          navigate(`/module/${moduleSlug}`)
        })
    }
  }

  const onSubmit = (data: ModuleVersion) => {
    const dirtyFieldsOnly: Partial<ModuleVersion> = {}
    const dirtyFieldKeys = Object.keys(dirtyFields) as Array<
      keyof ModuleVersion
    >
    if (!moduleVersion) {
      return
    }

    const {moduleSlug, version} = moduleVersion

    if (!dirtyFieldKeys.length) {
      navigate(`/module/${moduleSlug}`)
    } else {
      dirtyFieldKeys.forEach(<K extends keyof ModuleVersion>(field: K) => {
        dirtyFieldsOnly[field] = data[field]
      })
      setIsBeforeNavigation(true)
      editModuleVersion({
        ...dirtyFieldsOnly,
        moduleSlug,
        pathVersion: version,
      }).then(response => {
        if ('data' in response) {
          navigate(`/module/${moduleSlug}`)
        }
      })
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  const versionFieldValue = form.watch('version') ?? moduleVersion?.version
  const titleFieldValue = form.watch('title') ?? moduleVersion?.title

  if (!moduleVersion) {
    return (
      <ErrorScreen
        message={`Versie ${versionParam} van module ‘${slugParam}’ niet gevonden.`}
      />
    )
  }

  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle
          subtitle="Moduleversie"
          title={`${titleFieldValue} ${versionFieldValue}`}
        />
        <FormProvider {...form}>
          <Column gutter="lg">
            <ModuleTitleField defaultValue={moduleVersion.title} />
            <ModuleDescriptionField defaultValue={moduleVersion.description} />
            <ModuleIconField defaultValue={moduleVersion.icon} />
            {!isInRelease && (
              <VersionField
                baseVersion={moduleVersion.version}
                defaultValue={moduleVersion.version}
              />
            )}
            <LoadingButton
              error={editingModuleError}
              label="Opslaan"
              loading={isEditingModuleVersion}
              onClick={handleSubmit(onSubmit)}
            />
            {isInRelease ? (
              <Button
                label="Aan- of uitzetten"
                onClick={() =>
                  navigate(`/module/${slugParam}/${versionParam}/status`)
                }
                variant="secondary"
              />
            ) : (
              <Column gutter="sm">
                <LoadingButton
                  error={deletingModuleError}
                  label="Verwijderen"
                  loading={isDeletingModule}
                  onClick={handleRemoveModuleVersion}
                  variant="secondary"
                />
              </Column>
            )}
          </Column>
        </FormProvider>
      </Column>
    </Screen>
  )
}

export default EditModuleScreen
