import {skipToken} from '@reduxjs/toolkit/query'
import {useEffect, useMemo} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import DragDropModules from 'components/features/DragDropModules'
import Button from 'components/ui/button/Button'
import {
  selectRelease,
  setModules,
  setReleaseVersion,
} from 'slices/release.slice'
import {ModuleVersion} from 'types/module'
import MockModules from '../assets/mocks/modules.json'
import Column from '../components/ui/layout/Column'
import Screen from '../components/ui/layout/Screen'
import ScreenTitle from '../components/ui/text/ScreenTitle'
import {useGetModulesInReleaseQuery} from '../services/releases'
import {Release} from '../types/release'
import ErrorScreen from './Error.screen'
import LoadingScreen from './Loading.screen'

type Params = {
  version: Release['version']
}

const ReleaseScreen = () => {
  const dispatch = useDispatch()
  const release = useSelector(selectRelease)
  const {version} = useParams<Params>()
  const {data: modulesInRelease, isLoading} = useGetModulesInReleaseQuery(
    version ? {version} : skipToken,
  )
  const modules = useMemo(() => {
    return modulesInRelease
      ? modulesInRelease.map(module =>
          MockModules.find(m => m.moduleSlug === module.moduleSlug),
        )
      : []
  }, [modulesInRelease])

  useEffect(() => {
    if (version) dispatch(setReleaseVersion(version))
  }, [dispatch, version])

  useEffect(() => {
    if (modules) dispatch(setModules(modules as ModuleVersion[]))
  }, [dispatch, modules])

  const onSave = () => {
    // eslint-disable-next-line no-console
    console.log(release) // TODO: PATCH release to API
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!modules || !modules.length) {
    return (
      <ErrorScreen message={`Geen modules gevonden voor release ${version}.`} />
    )
  }

  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle subtitle="Release" title={`Amsterdam App ${version}`} />
        <DragDropModules />
        <Button label="Opslaan" onClick={onSave} />
      </Column>
    </Screen>
  )
}

export default ReleaseScreen
