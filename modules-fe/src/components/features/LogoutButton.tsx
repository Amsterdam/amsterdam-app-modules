import {useDispatch} from 'react-redux'
import Button from 'components/ui/button/Button'
import Icon from 'components/ui/media/Icon'
import {logout} from 'slices/authorization.slice'

const LogoutButton = () => {
  const dispatch = useDispatch()

  return (
    <Button
      icon={<Icon name="logout" />}
      label="Uitloggen"
      onClick={() => {
        dispatch(logout())
      }}
      variant="tertiary"
    />
  )
}

export default LogoutButton
