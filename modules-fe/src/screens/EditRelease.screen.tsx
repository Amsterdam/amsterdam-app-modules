import {skipToken} from '@reduxjs/toolkit/dist/query'
import isEqual from 'lodash.isequal'
import {useEffect, useMemo, useState} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useSelector} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import {
  useEditReleaseVersionMutation,
  useGetReleaseQuery,
} from 'services/releases'
import {selectReleaseModules} from 'slices/release.slice'
import {ModuleVersionWithRelease} from 'types/module'
import {ReleaseBase} from 'types/release'
import ReleaseScreen from './Release.screen'

type Params = {
  version: ReleaseBase['version']
}

const EditReleaseScreen = () => {
  const releaseModules = useSelector(selectReleaseModules)
  const {version: versionParam} = useParams<Params>()
  const {data: release, isLoading} = useGetReleaseQuery(
    versionParam ? {version: versionParam} : skipToken,
  )

  const defaultValues = useMemo(() => {
    if (release) {
      const {created, modified, published, unpublished, ...releaseProps} =
        release
      return {
        ...releaseProps,
        published: published ?? '',
        unpublished: unpublished ?? '',
      }
    }
    return {}
  }, [release])

  const form = useForm<ReleaseBase>({
    defaultValues,
  })
  const {formState} = form
  const {dirtyFields} = formState
  const navigate = useNavigate()
  const [editRelease] = useEditReleaseVersionMutation()
  const [initialReleaseModules, setInitialReleaseModules] = useState<
    ModuleVersionWithRelease[] | undefined
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

  return (
    <FormProvider {...form}>
      <ReleaseScreen
        isLoading={isLoading}
        onSubmit={handleEditRelease}
        release={release}
        subtitle="Release"
        title={`Amsterdam App ${versionParam}`}
        versionDefaultValue={versionParam}
      />
    </FormProvider>
  )
}

export default EditReleaseScreen
