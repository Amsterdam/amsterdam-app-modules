import {useNavigate} from 'react-router-dom'
import Button from 'components/ui/button/Button'
import BlockLink from '../components/ui/button/BlockLink'
import ErrorBox from '../components/ui/feedback/ErrorBox'
import LoadingBox from '../components/ui/feedback/LoadingBox'
import Box from '../components/ui/layout/Box'
import Column from '../components/ui/layout/Column'
import Row from '../components/ui/layout/Row'
import Screen from '../components/ui/layout/Screen'
import Icon from '../components/ui/media/Icon'
import List from '../components/ui/text/List'
import ListItem from '../components/ui/text/ListItem'
import Phrase from '../components/ui/text/Phrase'
import Title from '../components/ui/text/Title'
import {useGetModulesQuery} from '../services/modules'

const ModulesScreen = () => {
  const navigate = useNavigate()
  const {data: modules, isLoading} = useGetModulesQuery()

  if (isLoading) {
    return <LoadingBox />
  }

  if (!modules) {
    return <ErrorBox message="Geen modules gevonden." />
  }

  const sortedModules = [...modules].sort((a, b) =>
    a.title.localeCompare(b.title, 'nl'),
  )

  return (
    <Screen>
      <Column gutter="lg">
        <Title>Modules</Title>
        <Button
          label="Voeg module toe"
          onClick={() => {
            navigate(`/module/create`)
          }}
        />
        <Box inset="no" negativeInsetHorizontal="md">
          <List>
            {sortedModules.map(({icon, moduleSlug, title}) => (
              <ListItem key={moduleSlug}>
                <BlockLink to={`/module/${moduleSlug}`}>
                  <Box>
                    <Row gutter="md" valign="baseline">
                      <Icon name={icon} />
                      <Phrase>{title}</Phrase>
                    </Row>
                  </Box>
                </BlockLink>
              </ListItem>
            ))}
          </List>
        </Box>
      </Column>
    </Screen>
  )
}

export default ModulesScreen
