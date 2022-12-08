import BlockLink from '../button/BlockLink'
import './Logo.css'

const Logo = () => (
  <BlockLink to="/">
    <img alt="Gemeente Amsterdam" className="Logo" src="/logo.svg" />
  </BlockLink>
)

export default Logo
