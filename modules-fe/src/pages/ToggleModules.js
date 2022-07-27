import Logo from "../components/Logo"
import Navigation from "../components/Navigation"
import PageTitle from '../components/PageTitle'
import { useParams } from "react-router-dom"

const ToggleModules = () => {
    const { appversion } = useParams()
    return (
        <div>
            {/* Logo */}
            <Logo />

            {/* Navigation */}
            <Navigation location='/' text='Terug' />

            {/* Title component */}
            <PageTitle pageTitle='Zet een module aan/uit' />


            <div className="page_body">
                App versie {appversion}
            </div>
        </div>
    )
}

export default ToggleModules