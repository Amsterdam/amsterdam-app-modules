import {useNavigate} from 'react-router-dom'
import Button from 'components/ui/button/Button'
import BlockLink from '../components/ui/button/BlockLink'
import Module from '../components/ui/containers/Module'
import Box from '../components/ui/layout/Box'
import Column from '../components/ui/layout/Column'
import Screen from '../components/ui/layout/Screen'
import List from '../components/ui/text/List'
import ListItem from '../components/ui/text/ListItem'
import ScreenTitle from '../components/ui/text/ScreenTitle'
import {useGetModulesQuery} from '../services/modules'
import ErrorScreen from './Error.screen'
import LoadingScreen from './Loading.screen'

const ModulesScreen = () => {
  const navigate = useNavigate()
  const {data: modules, isLoading} = useGetModulesQuery()

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!modules) {
    return <ErrorScreen message="Geen modules gevonden." />
  }

  const sortedModules = [...modules].sort((a, b) =>
    a.title.localeCompare(b.title, 'nl'),
  )

  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle title="Modules" />
        <Button
          label="Module toevoegen"
          onClick={() => {
            navigate(`/module/create`)
          }}
        />
        <List>
          {sortedModules.map(({icon, moduleSlug, title}) => (
            <ListItem key={moduleSlug}>
              <BlockLink to={`/module/${moduleSlug}`}>
                <Box>
                  <Module {...{icon, title}} />
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
