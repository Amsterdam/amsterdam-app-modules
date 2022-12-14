import Box from '../layout/Box'
import Phrase from '../text/Phrase'

type Props = {
  message?: string
}

const LoadingBox = ({message = 'Laden...'}: Props) => (
  <Box>
    <Phrase>{message}</Phrase>
  </Box>
)

export default LoadingBox
