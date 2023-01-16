import LogoImage from 'assets/images/logo.svg'
import BlockLink from 'components/ui/button/BlockLink'
import Row from 'components/ui/layout/Row'
import './Logo.css'

const Logo = () => (
  <Row align="start">
    <BlockLink to="/">
      <img alt="Gemeente Amsterdam" className="Logo" src={LogoImage} />
    </BlockLink>
  </Row>
)

export default Logo
