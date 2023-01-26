import Button, {ButtonProps} from 'components/ui/button/Button'
import Icon from 'components/ui/media/Icon'

type Props = {
  loading: boolean
} & ButtonProps

const LoadingButton = ({loading, ...buttonProps}: Props) => {
  return (
    <Button
      disabled={loading}
      icon={loading ? <Icon color="inverse" name="spinner" /> : undefined}
      {...buttonProps}
    />
  )
}

export default LoadingButton
