import {useCallback} from 'react'
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form'
import {useNavigate, useParams} from 'react-router-dom'
import ErrorBox from 'components/ui/feedback/ErrorBox'
import LoadingBox from 'components/ui/feedback/LoadingBox'
import {useCreateModuleMutation, useGetModuleQuery} from 'services/modules'
import Button from '../components/ui/button/Button'
import Input from '../components/ui/forms/Input'
import RadioGroup from '../components/ui/forms/RadioGroup'
import Column from '../components/ui/layout/Column'
import Screen from '../components/ui/layout/Screen'
import {iconNames} from '../components/ui/media/iconPath'
import Title from '../components/ui/text/Title'
import {Module, ModuleSlug} from '../types/module'

const createVersionSuggestions = (version: string) => {
  const [major, minor, patch] = version.split('.').map(Number)

  return [
    `${major}.${minor}.${patch + 1}`,
    `${major}.${minor + 1}.0`,
    `${major + 1}.0.0`,
  ]
}

const CreateModuleScreen = () => {
  const navigate = useNavigate()

  const {slug}: {slug?: ModuleSlug} = useParams()
  const {data: modules, isLoading} = useGetModuleQuery({
    slug: slug as ModuleSlug,
  })
  const latestVersion = modules?.[0]

  const form = useForm<Module>()
  const [createModule] = useCreateModuleMutation()
  const {handleSubmit} = form

  const onSubmitForm: SubmitHandler<Module> = useCallback(
    data => {
      if (!slug) {
        return
      }

      createModule({...data, slug}).then(response => {
        if ('data' in response) {
          navigate(`/modules/${slug}`)
        }
      })
    },
    [createModule, navigate, slug],
  )

  if (isLoading) {
    return <LoadingBox />
  }

  if (!latestVersion) {
    return <ErrorBox message="Geen module versies gevonden" />
  }

  return (
    <Screen>
      <Column gutter="lg">
        <Title>Nieuwe versie module: {latestVersion.title}</Title>
        <FormProvider {...form}>
          <Column gutter="lg">
            <Input
              defaultValue={latestVersion.title}
              label="Naam"
              name="title"
              rules={{
                required: 'Geef de module een naam.',
              }}
            />
            <Input
              defaultValue={latestVersion.description}
              label="Omschrijving"
              name="description"
              rules={{
                required: 'Omschrijf de module in een paar woorden.',
              }}
            />
            <Input
              defaultValue={latestVersion.icon}
              label="Pictogram"
              name="icon"
              rules={{
                required: 'Geef aan welk pictogram de module illustreert.',
                validate: value =>
                  iconNames.includes(value) ||
                  'Geef de naam van een bestaand pictogram.',
              }}
            />
            <RadioGroup
              label="Versie"
              name="version"
              options={createVersionSuggestions(latestVersion.version)}
              rules={{required: 'Selecteer één van de mogelijke versies.'}}
            />
            <Button label="Toevoegen" onClick={handleSubmit(onSubmitForm)} />
          </Column>
        </FormProvider>
      </Column>
    </Screen>
  )
}

export default CreateModuleScreen
