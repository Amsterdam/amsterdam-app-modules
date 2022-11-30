import BlockLink from '../ui/button/BlockLink'
import Box from '../ui/layout/Box'
import Phrase from '../ui/text/Phrase'

const Header = () => (
  <Box>
    <BlockLink to="/">
      <Phrase>Gemeente Amsterdam</Phrase>
    </BlockLink>
  </Box>
)

export default Header
