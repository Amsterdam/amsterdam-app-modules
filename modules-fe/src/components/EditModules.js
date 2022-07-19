import Logo from "./Logo"
import Navigation from "./Navigation"
import PageTitle from './PageTitle'

const EditModules = () => {
    return (
        <div>
            {/* Logo */}
            <Logo />

            {/* Navigation */}
            <Navigation location='/' text='Terug' />

            {/* Title component */}
            <PageTitle pageTitle='Bewerk modules' />
        </div>
    )
}

export default EditModules