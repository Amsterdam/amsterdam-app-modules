import Box from '../components/ui/layout/Box'
import Row from '../components/ui/layout/Row'
import Screen from '../components/ui/layout/Screen'
import Icon from '../components/ui/media/Icon'
import List from '../components/ui/text/List'
import ListItem from '../components/ui/text/ListItem'
import Phrase from '../components/ui/text/Phrase'
import Title from '../components/ui/text/Title'
import {Module} from '../types/module'

const modules: Pick<Module, 'icon' | 'slug' | 'title'>[] = [
  {
    icon: 'construction-work',
    slug: 'construction-work',
    title: 'Werkzaamheden',
  },
  {
    icon: 'alert',
    slug: 'report-problem',
    title: 'Melding doen',
  },
  {
    icon: 'chatting',
    slug: 'contact',
    title: 'Contact',
  },
  {
    icon: 'checkmark',
    slug: 'redirects',
    title: 'Direct regelen',
  },
  {
    icon: 'info',
    slug: 'about',
    title: 'Over deze app',
  },
  {
    icon: 'housing',
    slug: 'welcome',
    title: 'Welkomstscherm',
  },
  {
    icon: 'trash-bin',
    slug: 'waste-guide',
    title: 'Afvalwijzer',
  },
  {
    icon: 'announcement',
    slug: 'construction-work-editor',
    title: 'Plaats berichten',
  },
  {
    icon: 'organic-waste-container',
    slug: 'open-waste-container',
    title: 'Gft-container openen',
  },
]

const ModulesScreen = () => {
  // const { data: modules, isLoading } = useGetModulesQuery(undefined);

  // if (isLoading) {
  //     return <p>loading...</p>;
  // }

  if (!modules) {
    return <p>Helaas</p>
  }

  const sortedModules = [...modules].sort((a, b) =>
    a.title.localeCompare(b.title, 'nl'),
  )

  return (
    <Screen>
      <Box>
        <Title>Modules</Title>
      </Box>
      <List>
        {sortedModules.map(({icon, slug, title}) => (
          <ListItem key={slug}>
            <Box>
              <Row gutter="md" valign="baseline">
                <Icon name={icon} />
                <Phrase>{title}</Phrase>
              </Row>
            </Box>
          </ListItem>
        ))}
      </List>
    </Screen>
  )
}

export default ModulesScreen
