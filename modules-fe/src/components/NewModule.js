import Logo from "./Logo"
import Navigation from "./Navigation"
import PageTitle from './PageTitle'

const NewModule = () => {
    return (
        <div>
            {/* Logo */}
            <Logo />

            {/* Navigation */}
            <Navigation location='/' text='Terug' />

            {/* Title component */}
            <PageTitle pageTitle='Nieuwe module' />
        </div>
    )
}

export default NewModule