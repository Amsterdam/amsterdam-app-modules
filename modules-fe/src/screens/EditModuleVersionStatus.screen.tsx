import {skipToken} from '@reduxjs/toolkit/dist/query'
import {useCallback, useEffect, useMemo} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useParams} from 'react-router-dom'
import ModuleStatusField from 'components/form-fields/ModuleStatusField'
import Button from 'components/ui/button/Button'
import LoadingBox from 'components/ui/feedback/LoadingBox'
import {CheckboxValue} from 'components/ui/forms/CheckboxField'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import Title from 'components/ui/text/Title'
import {useGetModuleVersionQuery} from 'services/modules'
import {ModuleStatusInRelease} from 'types/module'
import {
  getActiveReleases,
  getCombinedStatusInReleases,
} from 'utils/getCombinedStatusInReleases'
import Icon from '../components/ui/media/Icon'

type Params = {
  slug: string
  version: string
}

type FormData = {
  releases: string[]
  allSelected: CheckboxValue
}

const EditModuleVersionStatusScreen = () => {
  const {slug, version} = useParams<Params>()
  const form = useForm<FormData>()
  const {handleSubmit, setValue, watch} = form
  const watchAll = watch('allSelected')
  const watchReleases = watch('releases')

  const {data: moduleVersion, isLoading} = useGetModuleVersionQuery(
    slug && version
      ? {
          slug,
          version,
        }
      : skipToken,
  )

  const releases = useMemo(
    () =>
      moduleVersion?.statusInReleases
        ? getCombinedStatusInReleases(moduleVersion?.statusInReleases)
        : [],
    [moduleVersion?.statusInReleases],
  )

  const resetForm = useCallback(
    (newFormData: FormData) => {
      form.reset({...newFormData})
    },
    [form],
  )

  useEffect(() => {
    if (watchAll !== 'indeterminate') {
      const newFormData =
        watchAll === false
          ? {releases: [], allSelected: false}
          : {releases, allSelected: true}
      resetForm(newFormData)
    }
  }, [releases, resetForm, watchAll])

  useEffect(() => {
    if (watchReleases?.length === releases.length) {
      setValue('allSelected', true)
    } else if (!watchReleases?.length) {
      setValue('allSelected', false)
    } else {
      setValue('allSelected', 'indeterminate')
    }
  }, [releases, setValue, watchReleases])

  useEffect(() => {
    const activeReleases = moduleVersion?.statusInReleases
      ? getActiveReleases(moduleVersion?.statusInReleases)
      : []
    resetForm({
      releases: activeReleases,
      allSelected:
        // eslint-disable-next-line no-nested-ternary
        activeReleases.length === releases.length
          ? true
          : !activeReleases.length
          ? false
          : 'indeterminate',
    })
  }, [resetForm, releases, moduleVersion?.statusInReleases])

  const onSubmit = (data: FormData) => {
    const activeReleases: ModuleStatusInRelease = {status: 1, releases: []}
    const inactiveReleases: ModuleStatusInRelease = {status: 0, releases: []}

    releases.forEach(release => {
      if (data.releases.includes(release)) {
        activeReleases.releases.push(release)
      } else {
        inactiveReleases.releases.push(release)
      }
    })
    const result = [inactiveReleases, activeReleases]

    return result // TODO send to API once ready
  }

  if (isLoading) {
    return <LoadingBox />
  }

  const isSaving = false

  if (!moduleVersion?.statusInReleases) {
    return null
  }

  return (
    <Screen>
      <Column gutter="lg">
        <Title>
          Aan- of uitzetten module: {moduleVersion?.title} {version}
        </Title>
        <FormProvider {...form}>
          <ModuleStatusField releases={releases} />
        </FormProvider>
        <Button
          disabled={isSaving}
          icon={isSaving ? <Icon color="inverse" name="spinner" /> : undefined}
          label="Opslaan"
          onClick={handleSubmit(onSubmit)}
        />
      </Column>
    </Screen>
  )
}

export default EditModuleVersionStatusScreen
