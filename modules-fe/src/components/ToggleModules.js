import Logo from "./Logo"
import Navigation from "./Navigation"
import PageTitle from './PageTitle'

const ToggleModules = () => {
    return (
        <div>
            {/* Logo */}
            <Logo />

            {/* Navigation */}
            <Navigation location='/' text='Terug' />

            {/* Title component */}
            <PageTitle pageTitle='Zet een module aan / uit' />
        </div>
    )
}

export default ToggleModules