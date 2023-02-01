import {useEffect} from 'react'
import {useFormContext} from 'react-hook-form'
import {useDispatch} from 'react-redux'
import DragDropModules from 'components/features/DragDropModules'
import VersionField from 'components/form-fields/VersionField'
import Button from 'components/ui/button/Button'
import TextField from 'components/ui/forms/TextField'
import Column from 'components/ui/layout/Column'
import LoadingScreen from 'screens/Loading.screen'
import {setModules} from 'slices/release.slice'
import {ReleaseBase, ReleaseWithModuleVersions} from 'types/release'

type Props = {
  isLoading: boolean
  onSubmit: (data: ReleaseBase) => void
  release: ReleaseWithModuleVersions | undefined
  versionDefaultValue?: string
}

const ReleaseForm = ({
  isLoading,
  onSubmit,
  release,
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
  )
}

export default ReleaseForm
