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
  const {data: modules, isLoading} = useGetModulesQuery(undefined)

  if (isLoading) {
    return <LoadingBox />
  }

  if (!modules) {
    return <ErrorBox message="Geen modules." />
  }

  const sortedModules = [...modules].sort((a, b) =>
    a.title.localeCompare(b.title, 'nl'),
  )

  return (
    <Screen>
      <Column>
        <Box>
          <Title>Modules</Title>
        </Box>
        <List>
          {sortedModules.map(({icon, slug, title}) => (
            <ListItem key={slug}>
              <BlockLink to={`/modules/${slug}`}>
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
      </Column>
    </Screen>
  )
}

export default ModulesScreen