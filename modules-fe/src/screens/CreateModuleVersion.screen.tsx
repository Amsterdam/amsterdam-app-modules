import {useCallback} from 'react'
import {useForm, FormProvider, SubmitHandler} from 'react-hook-form'
import {useLocation, useParams} from 'react-router-dom'
import Input from 'components/ui/forms/Input'
import Radio from 'components/ui/forms/Radio'
import {Module} from 'types/module'
import Box from '../components/ui/layout/Box'
import Column from '../components/ui/layout/Column'
import Screen from '../components/ui/layout/Screen'
import {iconNames} from '../components/ui/media/iconPath'
import Title from '../components/ui/text/Title'

const createVersionSuggestions = (version: string) => {
  const [major, minor, patch] = version.split('.').map(Number)
  return [
    `${major}.${minor}.${patch + 1}`,
    `${major}.${minor + 1}.0`,
    `${major + 1}.${minor}.0`,
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
                  required: 'Vul een titel in',
                }}
              />
              <Input
                label="Omschrijving"
                name="description"
                rules={{
                  required: 'Vul een omschrijving in',
                }}
              />
              <Input
                label="Pictogram"
                name="icon"
                rules={{
                  required: 'Vul een pictogram in',
                  validate: value =>
                    iconNames.includes(value) || 'Kies een bestaand pictogram',
                }}
              />
              <Radio
                label="Versie"
                name="version"
                options={createVersionSuggestions(version)}
                rules={{required: 'Kies een versie'}}
              />
              <button onClick={handleSubmit(onSubmitForm)} type="submit">
                Opslaan
              </button>
            </Column>
          </FormProvider>
        </Box>
      </Column>
    </Screen>
  )
}

export default CreateModuleVersionScreen
