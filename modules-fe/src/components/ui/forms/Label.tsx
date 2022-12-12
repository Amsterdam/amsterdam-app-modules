import Phrase from '../text/Phrase'

type Props = {
  text: string
}

const Label = ({text}: Props) => <Phrase>{text}</Phrase>

export default Label
