import {useEffect} from 'react'
import {useFormContext} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import DragDropModules from 'components/features/DragDropModules'
import VersionField from 'components/form-fields/VersionField'
import Button from 'components/ui/button/Button'
import TextField from 'components/ui/forms/TextField'
import Column from 'components/ui/layout/Column'
import Screen from 'components/ui/layout/Screen'
import ScreenTitle from 'components/ui/text/ScreenTitle'
import LoadingScreen from 'screens/Loading.screen'
import {setModules} from 'slices/release.slice'
import {ReleaseBase, ReleaseWithModuleVersions} from 'types/release'

type Props = {
  isLoading: boolean
  onSubmit: (data: ReleaseBase) => void
  release: ReleaseWithModuleVersions | undefined
  subtitle: string
  title: string
  versionDefaultValue?: string
}

const ReleaseScreen = ({
  isLoading,
  onSubmit,
  release,
  subtitle,
  title,
  versionDefaultValue,
}: Props) => {
  const dispatch = useDispatch()
  const form = useFormContext<ReleaseBase>()
  const {handleSubmit} = form

  useEffect(() => {
    if (release) {
      dispatch(setModules(release.modules))
    }
  }, [dispatch, release])

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!release) {
    return null
  }

  return (
    <Screen>
      <Column gutter="lg">
        <ScreenTitle subtitle={subtitle} title={title} />
        <Column gutter="lg">
          <VersionField
            baseVersion={release.version}
            defaultValue={versionDefaultValue}
          />
          <DragDropModules />
          <TextField
            label="Gepubliceerd"
            name="published"
            type="date"
            width="half"
          />
          <TextField
            label="Ongepubliceerd"
            name="unpublished"
            type="date"
            width="half"
          />
          <TextField label="Release notes" name="releaseNotes" />
          <Button label="Opslaan" onClick={handleSubmit(onSubmit)} />
        </Column>
      </Column>
    </Screen>
  )
}

export default ReleaseScreen
