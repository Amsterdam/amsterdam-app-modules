import CheckboxField from 'components/ui/forms/CheckboxField'
import Column from 'components/ui/layout/Column'
import Phrase from 'components/ui/text/Phrase'

const releases = ['0.21.0', '0.23.0', '0.27.0']

const ModuleStatusField = () => (
  <Column gutter="sm">
    <Phrase color="muted">Zet aan of uit voor de volgende releases:</Phrase>
    <Column gutter="md">
      {releases.map(release => (
        <CheckboxField key={release} label={release} name="releases" />
      ))}
    </Column>
  </Column>
)

export default ModuleStatusField
