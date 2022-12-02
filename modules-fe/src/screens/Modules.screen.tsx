import {modules} from '../assets/mocks/modules'
import BlockLink from '../components/ui/button/BlockLink'
import ErrorBox from '../components/ui/feedback/ErrorBox'
import Box from '../components/ui/layout/Box'
import Column from '../components/ui/layout/Column'
import Row from '../components/ui/layout/Row'
import Icon from '../components/ui/media/Icon'
import List from '../components/ui/text/List'
import ListItem from '../components/ui/text/ListItem'
import Phrase from '../components/ui/text/Phrase'
import Title from '../components/ui/text/Title'

const ModulesScreen = () => {
  // const { data: modules, isLoading } = useGetModulesQuery(undefined);

  // if (isLoading) {
  //     return <p>loading...</p>;
  // }

  if (!modules) {
    return <ErrorBox message="Geen modules." />
  }

  const sortedModules = [...modules].sort((a, b) =>
    a.title.localeCompare(b.title, 'nl'),
  )

  return (
    <Column gutter="md">
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
  )
}

export default ModulesScreen
