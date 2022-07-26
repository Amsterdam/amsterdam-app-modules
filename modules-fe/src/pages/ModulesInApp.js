import { Link } from 'react-router-dom'
import Logo from "../components/Logo"
import PageTitle from '../components/PageTitle'
import useAPICalls from '../components/useAPICalls'
import { useState, useEffect, useContext } from 'react'

const ModulesInApp = () => {
    const [appVersions, setAppVersions] = useState([])
    const { getMethod, postMethod } = useAPICalls()

    useEffect(() => {
        const getData = async () => {
            const { data, response } = await getMethod('app-versions', {})
            if (response.status === 200) {
                setAppVersions(data.result);
                // Debug 
                console.log('appVersions', appVersions)
            }
        }
        getData();
    }, []);


    return (
        <div>
            {/* Logo */}
            <Logo />

            {/* Title component */}
            <PageTitle pageTitle='Modules in app' />

            {/* Drop down input field for appVersions */}

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

                {appVersions.map(version => (
                    <p>{version}</p>
                ))}
            </div>
        </div >
    )
}

export default ModulesInApp