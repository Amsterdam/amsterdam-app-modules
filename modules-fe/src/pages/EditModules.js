import Logo from "../components/Logo"
import Navigation from "../components/Navigation"
import PageTitle from '../components/PageTitle'

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