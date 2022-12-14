import Box from '../layout/Box'
import Phrase from '../text/Phrase'

type Props = {
  message: string
}

const ErrorBox = ({message}: Props) => (
  <Box>
    <Phrase color="error">{message}</Phrase>
  </Box>
)

export default ErrorBox
