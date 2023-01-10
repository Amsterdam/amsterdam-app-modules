import {skipToken} from '@reduxjs/toolkit/dist/query'
import {useEffect, useMemo} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useParams} from 'react-router-dom'
import ModuleStatusField from 'components/form-fields/ModuleStatusField'
import Button from 'components/ui/button/Button'
import LoadingBox from 'components/ui/feedback/LoadingBox'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import Title from 'components/ui/text/Title'
import {useGetModuleVersionQuery} from 'services/modules'
import {ModuleStatusInRelease} from 'types/module'
import {getCombinedStatusInReleases} from 'utils/getCombinedStatusInReleases'

type Params = {
  slug: string
  version: string
}

type FormData = {
  releases: string[]
}

const EditModuleStatusScreen = () => {
  const {slug, version} = useParams<Params>()
  const form = useForm<FormData>()
  const {handleSubmit} = form

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

  useEffect(() => {
    form.reset({
      releases,
    })
  }, [form, releases])

  const onSubmit = (data: FormData) => {
    const activeReleases: ModuleStatusInRelease = {status: 1, releases: []}
    const inActiveReleases: ModuleStatusInRelease = {status: 0, releases: []}
    releases.forEach(release => {
      if (data.releases.includes(release)) {
        activeReleases.releases.push(release)
      } else {
        inActiveReleases.releases.push(release)
      }
    })
    const result = [inActiveReleases, activeReleases]
    return result // TODO send to API once ready
  }

  if (isLoading) {
    return <LoadingBox />
  }

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
        <Button label="Opslaan" onClick={handleSubmit(onSubmit)} />
      </Column>
    </Screen>
  )
}

export default EditModuleStatusScreen
