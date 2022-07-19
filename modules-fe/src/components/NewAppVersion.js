import Logo from "./Logo"
import Navigation from "./Navigation"
import PageTitle from './PageTitle'

const NewAppVersion = () => {
    return (
        <div>
            {/* Logo */}
            <Logo />

            {/* Navigation */}
            <Navigation location='/' text='Terug' />

            {/* Title component */}
            <PageTitle pageTitle='Nieuwe app versie' />
        </div>
    )
}

export default NewAppVersion