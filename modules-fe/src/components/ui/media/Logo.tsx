import BlockLink from '../button/BlockLink'
import Row from '../layout/Row'
import './Logo.css'

const Logo = () => (
  <Row align="start">
    <BlockLink to="/">
      <img alt="Gemeente Amsterdam" className="Logo" src="/logo.svg" />
    </BlockLink>
  </Row>
)

export default Logo
