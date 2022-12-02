import BlockLink from '../button/BlockLink'
import './Logo.css'

const Logo = () => (
  <div className="logo">
    <BlockLink to="/">
      <img src="./logo.svg" alt="Gemeente Amsterdam" />
    </BlockLink>
  </div>
)

export default Logo
