import Title from 'components/ui/text/Title'
import './ScreenTitle.css'

type Props = {
  subtitle?: string
  title?: string
}

const ScreenTitle = ({subtitle, title}: Props) => (
  <hgroup className="ScreenTitle">
    {!!title && <Title>{title}</Title>}
    {!!subtitle && <Title level={3}>{subtitle}</Title>}
  </hgroup>
)

export default ScreenTitle
