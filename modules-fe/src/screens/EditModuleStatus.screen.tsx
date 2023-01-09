import {skipToken} from '@reduxjs/toolkit/dist/query'
import {FormProvider, useForm} from 'react-hook-form'
import {useParams} from 'react-router-dom'
import ModuleStatusField from 'components/form-fields/ModuleStatusField'
import LoadingBox from 'components/ui/feedback/LoadingBox'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import Title from 'components/ui/text/Title'
import {useGetModuleQuery} from 'services/modules'
import {ModuleStatusInRelease} from 'types/module'

type Params = {
  slug: string
  version: string
}

const EditModuleStatusScreen = () => {
  const {slug, version} = useParams<Params>()
  const form = useForm<ModuleStatusInRelease[]>()
  const {data: module, isLoading} = useGetModuleQuery(
    slug
      ? {
          slug,
        }
      : skipToken,
  )
  const moduleVersion = module?.find(m => m.version === version)

  if (isLoading) {
    return <LoadingBox />
  }

  return (
    <Screen>
      <Column gutter="lg">
        <Title>
          Aan- of uitzetten module: {moduleVersion?.title} {version}
        </Title>
        <FormProvider {...form}>
          <ModuleStatusField />
        </FormProvider>
      </Column>
    </Screen>
  )
}

export default EditModuleStatusScreen
