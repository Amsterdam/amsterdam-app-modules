import {useEffect} from 'react'
import {FormProvider, useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import Button from 'components/ui/button/Button'
import TextField from 'components/ui/forms/TextField'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import Icon from 'components/ui/media/Icon'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import {useAuthorization} from 'hooks/useAuthorization'
import {Login} from 'types/authorization'

const LoginScreen = () => {
  const {isAccessTokenValid, isLoggingIn, login} = useAuthorization()
  const navigate = useNavigate()

  const form = useForm<Login>()
  const {handleSubmit} = form

  const onSubmitForm = (data: Login) => {
    login(data)
  }

  useEffect(() => {
    if (isAccessTokenValid) {
      navigate('/')
    }
  }, [isAccessTokenValid, navigate])

  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle title="Login" />
        <FormProvider {...form}>
          <Column gutter="lg">
            <TextField
              label="Gebruikersnaam"
              name="username"
              rules={{
                required: 'Voer een gebruikersnaam in.',
              }}
              width="half"
            />
            <TextField
              label="Wachtwoord"
              name="password"
              rules={{
                required: 'Voer een wachtwoord in.',
              }}
              type="password"
              width="half"
            />
            <Button
              disabled={isLoggingIn}
              icon={
                isLoggingIn ? (
                  <Icon color="inverse" name="spinner" />
                ) : undefined
              }
              label="Login"
              onClick={handleSubmit(onSubmitForm)}
            />
          </Column>
        </FormProvider>
      </Column>
    </Screen>
  )
}

export default LoginScreen
