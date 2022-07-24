import { Link } from 'react-router-dom'
import Logo from "../components/Logo"
import PageTitle from '../components/PageTitle'
import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'
import { getMethod, postMethod } from '../components/APICalls'
import { useState, useEffect } from 'react'

const ModulesInApp = () => {
    const { auth, setAuth } = useContext(AuthContext)
    const [appVersions, setAppVersions] = useState([])
    const [test, setTest] = useState(null)
    useEffect(() => {
        const getData = async () => {
            const { data, response } = await getMethod('app-versions', {}, auth.access)
            setAppVersions(data.result);
        }
        getData();
    }, []);

    useEffect(() => {
        const getData = async () => {
            const { data, response } = await postMethod('get-token', {}, { username: 'redactie@amsterdam.nl', password: 'gd@3bFC12' }, '')
            setTest(data.access);
        }
        getData();
    }, []);

    //console.log('auth', auth)
    console.log('appVersions', appVersions)
    //console.log('test', test)

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
                <p>{auth.access}</p>
                {appVersions.map(version => (
                    <p>{version}</p>
                ))}
                <p>{test}</p>
            </div>
        </div >
    )
}

export default ModulesInApp