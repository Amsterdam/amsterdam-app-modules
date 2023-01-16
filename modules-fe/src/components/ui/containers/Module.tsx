import Phrase, {PhraseProps} from 'components/ui/text/Phrase'
import {ModuleVersion} from 'types/module'
import Row from '../layout/Row'
import Icon from '../media/Icon'

type Props = Pick<ModuleVersion, 'icon' | 'title'> &
  Partial<Pick<ModuleVersion, 'version'>> &
  Pick<PhraseProps, 'color'>

const Module = ({color, icon, title, version}: Props) => (
  <Row gutter="sm" valign="center">
    <Icon color={color} name={icon} />
    <div>
      <Phrase color={color} emphasis="strong">
        {title}
      </Phrase>
      {!!version && (
        <>
          {' '}
          <Phrase color={color}>{version}</Phrase>
        </>
      )}
    </div>
  </Row>
)

export default Module
