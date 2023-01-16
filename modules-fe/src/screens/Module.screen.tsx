import {skipToken} from '@reduxjs/toolkit/query'
import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {ModuleStatus} from 'types/module'
import Button from '../components/ui/button/Button'
import Column from '../components/ui/layout/Column'
import Screen from '../components/ui/layout/Screen'
import ScreenTitle from '../components/ui/text/ScreenTitle'
import {useGetModuleQuery} from '../services/modules'
import ErrorScreen from './Error.screen'
import LoadingScreen from './Loading.screen'

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
  const [moduleStatus, setModuleStatus] = useState<ModuleStatus | undefined>(
    module?.status,
  )

  useEffect(() => {
    if (moduleStatus === undefined) {
      return
    }
    // eslint-disable-next-line no-console
    console.log("API call to update module's status") // TODO: implement API call once ready
  }, [moduleStatus])

  const handleModuleStatusChange = () => {
    if (
      // eslint-disable-next-line no-alert
      window.confirm(
        `Bevestig dat je alle versies van de module ‘${latestVersion?.title}’ ${
          moduleStatus ? 'uit' : 'aan'
        } wil zetten.`,
      )
    ) {
      setModuleStatus(
        moduleStatus === ModuleStatus.active
          ? ModuleStatus.inactive
          : ModuleStatus.active,
      )
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  if (module?.versions.length) {
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
        <Button
          variant="secondary"
          label={
            moduleStatus === ModuleStatus.active ? 'Uitzetten' : 'Aanzetten'
          }
          onClick={handleModuleStatusChange}
        />
      </Column>
    </Screen>
  )
}

export default ModuleScreen
