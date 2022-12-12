import LogoImage from '../../../assets/images/logo.svg'
import BlockLink from '../button/BlockLink'
import Row from '../layout/Row'
import './Logo.css'

const Logo = () => (
  <Row align="start">
    <BlockLink to="/">
      <img alt="Gemeente Amsterdam" className="Logo" src={LogoImage} />
    </BlockLink>
  </Row>
)

export default Logo
