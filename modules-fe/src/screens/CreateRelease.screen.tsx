import {FormProvider, useForm} from 'react-hook-form'
import VersionField from 'components/form-fields/VersionField'
import {Release} from 'types/release'
import Column from '../components/ui/layout/Column'
import Screen from '../components/ui/layout/Screen'
import Title from '../components/ui/text/Title'

const CreateReleaseScreen = () => {
  const form = useForm<Release>()

  return (
    <Screen>
      <FormProvider {...form}>
        <Column gutter="lg">
          <Title>Toevoegen: Release</Title>
          <VersionField baseVersion="0.27.0" />
        </Column>
      </FormProvider>
    </Screen>
  )
}

export default CreateReleaseScreen
