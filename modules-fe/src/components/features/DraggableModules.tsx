import {ReactNode} from 'react'
import Draggable from 'components/drag-n-drop/Draggable'
import Droppable from 'components/drag-n-drop/Droppable'
import Box from 'components/ui/layout/Box'
import Row from 'components/ui/layout/Row'
import Icon from 'components/ui/media/Icon'
import List from 'components/ui/text/List'
import ListItem from 'components/ui/text/ListItem'
import Phrase from 'components/ui/text/Phrase'
import {ModuleVersion} from 'types/module'

type MutablePhraseProps = {
  children: ReactNode
}

const MutedPhrase = ({children}: MutablePhraseProps) => (
  <Phrase color="muted">{children}</Phrase>
)

type DraggableModulesProps = {
  droppableId: string
  modules: ModuleVersion[]
  variant?: 'active' | 'inactive'
}

const DraggableModules = ({
  droppableId,
  modules,
  variant = 'active',
}: DraggableModulesProps) => {
  const PhraseComponent = variant === 'active' ? Phrase : MutedPhrase

  return (
    <div>
      <Phrase color="muted">
        {variant === 'active' ? 'Actieve Modules' : 'Inactieve Modules'}
      </Phrase>
      <Box inset="no" negativeInsetHorizontal="md">
        <Droppable droppableId={droppableId}>
          <List>
            {modules.map(({icon, slug, title, version}, index) => (
              <Draggable key={slug} draggableId={slug} index={index}>
                <ListItem>
                  <Box>
                    <Row gutter="sm" valign="baseline">
                      <Icon
                        fill={variant === 'inactive' ? 'muted' : undefined}
                        name={icon}
                      />
                      <PhraseComponent>{title}</PhraseComponent>
                      <PhraseComponent>-</PhraseComponent>
                      <PhraseComponent>{`v${version}`}</PhraseComponent>
                    </Row>
                  </Box>
                </ListItem>
              </Draggable>
            ))}
          </List>
        </Droppable>
      </Box>
    </div>
  )
}

export default DraggableModules
