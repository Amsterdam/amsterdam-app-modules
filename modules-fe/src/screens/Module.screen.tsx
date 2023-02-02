import {skipToken} from '@reduxjs/toolkit/query'
import {useNavigate, useParams} from 'react-router-dom'
import LoadingButton from 'components/features/LoadingButton'
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
import {useEditModuleMutation, useGetModuleQuery} from 'services/modules'
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
  const [editModule, {isLoading: isEditingModule, error: editModuleError}] =
    useEditModuleMutation()

  const handleModuleStatusChange = () => {
    if (!module) {
      return
    }
    if (
      // eslint-disable-next-line no-alert
      window.confirm(
        `Bevestig dat je alle versies van de module ‘${latestVersion?.title}’ ${
          module?.status ? 'uit' : 'aan'
        } wil zetten.`,
      )
    ) {
      editModule({
        slug: module?.slug,
        status:
          module?.status === ModuleStatus.active
            ? ModuleStatus.inactive
            : ModuleStatus.active,
      })
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
        <LoadingButton
          error={editModuleError}
          label={
            module?.status === ModuleStatus.active ? 'Uitzetten' : 'Aanzetten'
          }
          loading={isEditingModule}
          onClick={handleModuleStatusChange}
          variant="secondary"
        />
      </Column>
    </Screen>
  )
}

export default ModuleScreen
