import { useAPICall } from '../components/APICalls'
import { Link } from 'react-router-dom'
import Logo from "../components/Logo"
import PageTitle from '../components/PageTitle'

const ModulesInApp = () => {
    const modules_in_app = useAPICall('/tasks')
    console.log(modules_in_app.data)

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

                {modules_in_app.data.map((item) => (
                    <p key={item.id}>{item.day}</p>
                ))}
            </div>
        </div >
    )
}

export default ModulesInApp