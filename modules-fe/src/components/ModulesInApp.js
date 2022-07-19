import { Link } from 'react-router-dom'
import Logo from "./Logo"
import PageTitle from './PageTitle'

const ModulesInApp = () => {
    return (
        <div>
            {/* Logo */}
            <Logo />

            {/* Title component */}
            <PageTitle pageTitle='Modules in app' />

            {/* Dummy links to test navigation */}
            <div className='DUMMY'>
                <p>
                    <Link to='/new-module'>NewModule</Link>
                </p>
                <p>
                    <Link to='/edit-module'>EditModule</Link>
                </p>
                <p>
                    <Link to='/edit-modules'>EditModules</Link>
                </p>
                <p>
                    <Link to='/toggle-modules'>ToggleModules</Link>
                </p>
                <p>
                    <Link to='/new-app-version'>NewAppVersion</Link>
                </p>
            </div>
        </div >
    )
}

export default ModulesInApp