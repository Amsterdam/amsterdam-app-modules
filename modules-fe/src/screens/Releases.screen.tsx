import {useNavigate} from 'react-router-dom'
import BlockLink from '../components/ui/button/BlockLink'
import Button from '../components/ui/button/Button'
import ErrorBox from '../components/ui/feedback/ErrorBox'
import LoadingBox from '../components/ui/feedback/LoadingBox'
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
    return <LoadingBox />
  }

  if (!releases || !releases.length) {
    return <ErrorBox message="Geen releases gevonden." />
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
                  <Phrase>Versie {version}</Phrase>
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
