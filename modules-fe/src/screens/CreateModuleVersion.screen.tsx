import {useCallback} from 'react'
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form'
import {useLocation, useParams} from 'react-router-dom'
import Button from '../components/ui/button/Button'
import Input from '../components/ui/forms/Input'
import RadioGroup from '../components/ui/forms/RadioGroup'
import Box from '../components/ui/layout/Box'
import Column from '../components/ui/layout/Column'
import Screen from '../components/ui/layout/Screen'
import {iconNames} from '../components/ui/media/iconPath'
import Title from '../components/ui/text/Title'
import {Module} from '../types/module'

const createVersionSuggestions = (version: string) => {
  const [major, minor, patch] = version.split('.').map(Number)

  return [
    `${major}.${minor}.${patch + 1}`,
    `${major}.${minor + 1}.0`,
    `${major + 1}.0.0`,
  ]
}

const CreateModuleVersionScreen = () => {
  const {slug} = useParams()
  const {state} = useLocation()
  const {title, version} = state.mostRecentVersion
  const form = useForm<Module>()

  const {handleSubmit} = form

  const onSubmitForm: SubmitHandler<Module> = useCallback(
    data => {
      console.log({...data, slug})
    },
    [slug],
  )

  return (
    <Screen>
      <Column>
        <Box>
          <Title>Nieuwe versie module: {title}</Title>
        </Box>
        <Box>
          <FormProvider {...form}>
            <Column gutter="md">
              <Input
                label="Naam"
                name="title"
                rules={{
                  required: 'Geef de module een naam.',
                }}
              />
              <Input
                label="Omschrijving"
                name="description"
                rules={{
                  required: 'Omschrijf de module in een paar woorden.',
                }}
              />
              <Input
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
                options={createVersionSuggestions(version)}
                rules={{required: 'Selecteer één van de mogelijke versies.'}}
              />
              <Button label="Toevoegen" onClick={handleSubmit(onSubmitForm)} />
            </Column>
          </FormProvider>
        </Box>
      </Column>
    </Screen>
  )
}

export default CreateModuleVersionScreen
