import {useParams} from 'react-router-dom'
import Column from '../components/ui/layout/Column'
import Screen from '../components/ui/layout/Screen'
import Title from '../components/ui/text/Title'
import {Release} from '../types/release'

type Params = {
  version?: Release
}

const ReleaseScreen = () => {
  const {version}: Partial<Params> = useParams()

  return (
    <Screen>
      <Column gutter="lg">
        <Title>Release: {version}</Title>
      </Column>
    </Screen>
  )
}

export default ReleaseScreen
