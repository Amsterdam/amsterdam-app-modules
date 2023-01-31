import {SerializedError} from '@reduxjs/toolkit'
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query'
import Button, {ButtonProps} from 'components/ui/button/Button'
import Column from 'components/ui/layout/Column'
import Icon from 'components/ui/media/Icon'
import Phrase from 'components/ui/text/Phrase'

type Props = {
  error?: FetchBaseQueryError | SerializedError
  loading: boolean
} & ButtonProps

const LoadingButton = ({error, loading, ...buttonProps}: Props) => (
  <Column gutter="sm">
    <Button
      disabled={loading}
      icon={loading ? <Icon color="inverse" name="spinner" /> : undefined}
      {...buttonProps}
    />
    {!!error && (
      <Phrase color="error">{`${'status' in error && error?.status} ${
        'data' in error && (error?.data as {message: string})?.message
      }`}</Phrase>
    )}
  </Column>
)

export default LoadingButton
