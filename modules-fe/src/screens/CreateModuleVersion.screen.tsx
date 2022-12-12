import capitalize from 'lodash.capitalize'
import {useCallback} from 'react'
import {useForm, FormProvider, SubmitHandler} from 'react-hook-form'
import {useParams} from 'react-router-dom'
import Input from 'components/ui/forms/Input'
import {Module} from 'types/module'
import Box from '../components/ui/layout/Box'
import Column from '../components/ui/layout/Column'
import Screen from '../components/ui/layout/Screen'
import {iconNames} from '../components/ui/media/iconPath'
import Title from '../components/ui/text/Title'

const CreateModuleVersionScreen = () => {
  const {slug} = useParams()
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
          <Title>Nieuwe versie module: {capitalize(slug)}</Title>
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
