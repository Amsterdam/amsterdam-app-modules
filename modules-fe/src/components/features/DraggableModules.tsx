import Draggable from 'components/drag-n-drop/Draggable'
import Droppable from 'components/drag-n-drop/Droppable'
import Box from 'components/ui/layout/Box'
import Row from 'components/ui/layout/Row'
import Icon from 'components/ui/media/Icon'
import List from 'components/ui/text/List'
import ListItem from 'components/ui/text/ListItem'
import Phrase from 'components/ui/text/Phrase'
import {ModuleVersion} from 'types/module'
import './DraggableModules.css'

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
  return (
    <div className="DraggableModules" data-isActive={variant === 'active'}>
      <Phrase>
        {variant === 'active' ? 'Actieve Modules' : 'Inactieve Modules'}
      </Phrase>
      <Box inset="no" negativeInsetHorizontal="md">
        <Droppable droppableId={droppableId}>
          <List>
            {modules.map(({icon, moduleSlug, title, version}, index) => (
              <Draggable
                key={moduleSlug}
                draggableId={moduleSlug}
                index={index}>
                <ListItem>
                  <Box>
                    <Row gutter="sm" valign="baseline">
                      <Icon name={icon} />
                      <Phrase>{title}</Phrase>
                      <Phrase>-</Phrase>
                      <Phrase>{`v${version}`}</Phrase>
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
