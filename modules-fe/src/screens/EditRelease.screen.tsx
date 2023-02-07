import {skipToken} from '@reduxjs/toolkit/dist/query'
import isEqual from 'lodash.isequal'
import {useEffect, useState} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useSelector} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import {
  useEditReleaseVersionMutation,
  useGetReleaseQuery,
} from 'services/releases'
import {selectReleaseModules} from 'slices/release.slice'
import {ModuleVersionWithStatusInReleases} from 'types/module'
import {ReleaseBase} from 'types/release'
import ReleaseForm from '../components/features/ReleaseForm'
import ErrorScreen from './Error.screen'
import LoadingScreen from './Loading.screen'

type Params = {
  version: ReleaseBase['version']
}

const EditReleaseScreen = () => {
  const releaseModules = useSelector(selectReleaseModules)
  const [isBeforeNavigation, setIsBeforeNavigation] = useState(false)
  const {version: versionParam} = useParams<Params>()
  const {data: release, isLoading} = useGetReleaseQuery(
    versionParam && !isBeforeNavigation ? {version: versionParam} : skipToken,
  )

  const form = useForm<ReleaseBase>()
  const {formState, reset} = form

  useEffect(() => {
    if (release) {
      const {created, modified, published, unpublished, ...releaseProps} =
        release
      reset({
        ...releaseProps,
        published: published ?? '',
        unpublished: unpublished ?? '',
      })
    }
  }, [release, reset])

  const {dirtyFields} = formState
  const navigate = useNavigate()
  const [editRelease] = useEditReleaseVersionMutation()
  const [initialReleaseModules, setInitialReleaseModules] = useState<
    ModuleVersionWithStatusInReleases[] | undefined
  >()

  useEffect(() => {
    if (!initialReleaseModules && releaseModules) {
      setInitialReleaseModules(releaseModules)
    }
  }, [initialReleaseModules, releaseModules])

  const handleEditRelease = async (data: ReleaseBase) => {
    if (!versionParam) {
      return
    }
    const dirtyFieldsOnly: Partial<ReleaseBase> = {}
    const dirtyFieldKeys = Object.keys(dirtyFields) as Array<keyof ReleaseBase>
    const isModulesModified = !isEqual(releaseModules, initialReleaseModules)
    setIsBeforeNavigation(true)
    if (!dirtyFieldKeys.length && !isModulesModified) {
      // No changes made
      navigate('/releases')
    } else {
      // Only send the fields that have been modified
      dirtyFieldKeys.forEach(<K extends keyof ReleaseBase>(field: K) => {
        dirtyFieldsOnly[field] = data[field]
      })

      const preparedData = {
        ...dirtyFieldsOnly,
        modules: releaseModules.map(({moduleSlug, version}) => ({
          moduleSlug,
          status:
            release?.modules.find(module => module.moduleSlug === moduleSlug)
              ?.status ?? 1,
          version,
        })),
        pathVersion: versionParam,
      }

      const result = await editRelease(preparedData)
      if ('data' in result) {
        navigate('/releases')
      }
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!release) {
    return (
      <ErrorScreen message="De release versie kon niet worden opgehaald." />
    )
  }

  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle
          subtitle="Release"
          title={`Amsterdam App ${versionParam}`}
        />
        <FormProvider {...form}>
          <ReleaseForm
            onSubmit={handleEditRelease}
            release={release}
            versionDefaultValue={versionParam}
          />
        </FormProvider>
      </Column>
    </Screen>
  )
}

export default EditReleaseScreen
