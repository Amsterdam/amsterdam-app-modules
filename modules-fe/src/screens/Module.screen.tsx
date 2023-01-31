import {skipToken} from '@reduxjs/toolkit/query'
import {useNavigate, useParams} from 'react-router-dom'
import BlockLink from 'components/ui/button/BlockLink'
import Button from 'components/ui/button/Button'
import Module from 'components/ui/containers/Module'
import Box from 'components/ui/layout/Box'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import List from 'components/ui/text/List'
import ListItem from 'components/ui/text/ListItem'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import ErrorScreen from 'screens/Error.screen'
import LoadingScreen from 'screens/Loading.screen'
import {useGetModuleQuery} from 'services/modules'
import {ModuleStatus} from 'types/module'

type Params = {
  slug: string
}

const ModuleScreen = () => {
  const navigate = useNavigate()

  const {slug} = useParams<Params>()
  const {data: module, isLoading} = useGetModuleQuery(
    slug
      ? {
          slug,
        }
      : skipToken,
  )
  const latestVersion = module?.versions[0]

  const handleModuleStatusChange = () => {
    if (
      // eslint-disable-next-line no-alert
      window.confirm(
        `Bevestig dat je alle versies van de module ‘${latestVersion?.title}’ ${
          module?.status ? 'uit' : 'aan'
        } wil zetten.`,
      )
    ) {
      // eslint-disable-next-line no-console
      console.log("API call to update module's status") // TODO: implement API call once ready
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!module?.versions.length) {
    return (
      <ErrorScreen message={`Geen versies gevonden van module ‘${slug}’.`} />
    )
  }

  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle subtitle="Module" title={latestVersion?.title} />
        <Button
          label="Moduleversie toevoegen"
          onClick={() => {
            navigate(`/module/${slug}/create`)
          }}
        />
        <List>
          {module.versions.map(({icon, title, version}) => (
            <ListItem key={version}>
              <BlockLink to={`/module/${slug}/${version}`}>
                <Box>
                  <Module {...{icon, title, version}} />
                </Box>
              </BlockLink>
            </ListItem>
          ))}
        </List>
        <Button
          variant="secondary"
          label={
            module?.status === ModuleStatus.active ? 'Uitzetten' : 'Aanzetten'
          }
          onClick={handleModuleStatusChange}
        />
      </Column>
    </Screen>
  )
}

export default ModuleScreen
