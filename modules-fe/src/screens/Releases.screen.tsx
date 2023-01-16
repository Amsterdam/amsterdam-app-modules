import {useNavigate} from 'react-router-dom'
import BlockLink from '../components/ui/button/BlockLink'
import Button from '../components/ui/button/Button'
import ErrorScreen from '../components/ui/feedback/Error.screen'
import LoadingScreen from '../components/ui/feedback/Loading.screen'
import Box from '../components/ui/layout/Box'
import Column from '../components/ui/layout/Column'
import Screen from '../components/ui/layout/Screen'
import List from '../components/ui/text/List'
import ListItem from '../components/ui/text/ListItem'
import Phrase from '../components/ui/text/Phrase'
import ScreenTitle from '../components/ui/text/ScreenTitle'
import {useGetReleasesQuery} from '../services/releases'

const ReleasesScreen = () => {
  const navigate = useNavigate()

  const {data: releases, isLoading} = useGetReleasesQuery()

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!releases || !releases.length) {
    return <ErrorScreen message="Geen releases gevonden." />
  }

  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle title="Releases" />
        <Button
          label="Release toevoegen"
          onClick={() => navigate('/release/create')}
        />
        <List>
          {releases.map(version => (
            <ListItem key={version}>
              <BlockLink to={`/release/${version}`}>
                <Box>
                  <Phrase>Release {version}</Phrase>
                </Box>
              </BlockLink>
            </ListItem>
          ))}
        </List>
      </Column>
    </Screen>
  )
}

export default ReleasesScreen
