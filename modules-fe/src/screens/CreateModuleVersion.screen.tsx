import capitalize from 'lodash.capitalize'
import {useParams} from 'react-router-dom'
import Box from '../components/ui/layout/Box'
import Column from '../components/ui/layout/Column'
import Screen from '../components/ui/layout/Screen'
import Title from '../components/ui/text/Title'

const CreateModuleVersionScreen = () => {
  const {slug} = useParams()

  return (
    <Screen>
      <Column>
        <Box>
          <Title>Nieuwe versie module: {capitalize(slug)}</Title>
        </Box>
      </Column>
    </Screen>
  )
}

export default CreateModuleVersionScreen
