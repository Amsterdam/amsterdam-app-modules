import { Link } from 'react-router-dom'
import Logo from "../components/Logo"
import PageTitle from '../components/PageTitle'
import useAPICalls from '../components/useAPICalls'
import { useState, useEffect, useRef } from 'react'

const ModulesInApp = () => {
    const hasFetchedData = useRef(false)
    const appVersionHasChanged = useRef(true)
    const [appVersions, setAppVersions] = useState([])
    const [appVersion, setAppVersion] = useState('')
    const [modulesByApp, setModulesByApp] = useState([])
    const { getMethod } = useAPICalls()

    useEffect(() => {
        const getModulesByApp = async () => {
            const { data, response } = await getMethod('modules_by_app', { appVersion: appVersion })
            if (response.status === 200) {
                setModulesByApp(data.result)
            }
        }

        if (appVersion !== '' && appVersionHasChanged.current) {
            getModulesByApp()
            appVersionHasChanged.current = false
        }
    }, [appVersion, getMethod])

    useEffect(() => {
        const getAppVersions = async () => {
            const { data, response } = await getMethod('app-versions', {})
            if (response.status === 200) {
                setAppVersions(data.result)
                if (data.result.lenght !== 0) { changeVersion(data.result[0]) }
            }
        }

        if (!hasFetchedData.current) {
            getAppVersions()
            hasFetchedData.current = true
        }
    }, [appVersions, getMethod])

    const changeVersion = (version) => {
        setAppVersion(version)
        appVersionHasChanged.current = true
    }

    return (
        <div>
            {/* Logo */}
            <Logo />

            {/* Title component */}
            <PageTitle pageTitle='Modules in app' />

            {/* Dummy links to test navigation */}
            <div className='page_body'>
                {/* Select appVersion */}
                <select
                    className='select'
                    onChange={(event) => changeVersion(event.target.value)}
                    value={appVersion}>
                    {appVersions.map(version => (
                        <option
                            key={version}
                            value={version}>
                            Versie {version}
                        </option>
                    ))}
                </select>

                {/* Modules for this appVersion */}
                <ul>
                    {modulesByApp.map(module => (
                        <li key={module.id}>{module.moduleSlug}</li>
                    ))}
                </ul>

                {/* Button navigation */}
                <div id="wrapper">
                    <Link className='block' to='/new-module'>1</Link>
                    <Link className='block' to='/edit-module'>
                        <img
                            style={{ marginTop: '15px' }}
                            height={'14px'}
                            src='/edit-white.svg'
                            alt='Edit module' />
                    </Link>
                    <Link className='block' to={`/toggle-modules/${appVersion}`}>Aan / Uit</Link>
                    <Link className='block bigger' to='/new-app-version'>Maak nieuwe app versie</Link>
                </div>

                {/*
                    <Link to={`/toggle-modules/${appVersion}`}>EditModules</Link>
                */}
            </div>
        </div >
    )
}

export default ModulesInApp