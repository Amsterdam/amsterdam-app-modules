import Logo from "./Logo"
import Navigation from "./Navigation"
import PageTitle from './PageTitle'

const EditModule = () => {
    return (
        <div>
            {/* Logo */}
            <Logo />

            {/* Navigation */}
            <Navigation location='/' text='Terug' />

            {/* Title component */}
            <PageTitle pageTitle='Module wijzigen' />
        </div>
    )
}

export default EditModule