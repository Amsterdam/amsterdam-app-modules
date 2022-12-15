import {useNavigate} from 'react-router-dom'
import Button from 'components/ui/button/Button'
import Box from 'components/ui/layout/Box'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'

const HomeScreen = () => {
  const navigate = useNavigate()
  return (
    <Screen>
      <Box>
        <Column gutter="sm">
          <Button
            label="Modules beheren"
            onClick={() => navigate('/modules')}
          />
          <Button
            label="Releases beheren"
            onClick={() => navigate('/releases')}
          />
        </Column>
      </Box>
    </Screen>
  )
}

export default HomeScreen
