import { Link } from 'react-router-dom'
import Logo from "../components/Logo"
import PageTitle from '../components/PageTitle'
import useAPICalls from '../components/useAPICalls'
import { useState, useEffect, useRef } from 'react'
import { Select } from '@amsterdam/asc-ui'
import { Enlarge } from '@amsterdam/asc-assets'
import ListModules from '../components/ListModules'

const ModulesInApp = () => {
    const hasFetchedData = useRef(false)
    const appVersionHasChanged = useRef(true)
    const [appVersions, setAppVersions] = useState([])
    const [appVersion, setAppVersion] = useState('')
    const [modulesByApp, setModulesByApp] = useState([])
    const { getMethod } = useAPICalls()

    useEffect(() => {
        const getModulesByApp = async () => {
            const { data, response } = await getMethod('modules_for_app', {}, { appVersion: appVersion })
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
                <div style={{
                    position: 'absolute',
                    left: '15px',
                    width: '344px',
                    height: '48px'
                }}>
                    <Select
                        onChange={(event) => changeVersion(event.target.value)}
                        value={appVersion}>
                        {appVersions.map(version => (
                            <option
                                key={version}
                                value={version}>
                                Versie {version}
                            </option>
                        ))}
                    </Select>
                </div>

                {/* Modules for this appVersion */}
                <div style={{
                    paddingTop: '25px'
                }}>
                    <ListModules modules={modulesByApp} />
                </div>

                {/* Button navigation */}
                <div id="wrapper">
                    <Link className='block' to={`/new-module/${appVersion}`}>
                        <Enlarge
                            style={{
                                fill: 'white',
                                position: 'relative',
                                top: '17px',
                                display: 'flex',
                                left: '50px'
                            }}
                            height={'14px'}
                            alt='Voeg nieuwe module toe'
                        />
                    </Link>
                    <Link className='block' to={`/edit-modules/${appVersion}`}>
                        <img
                            style={{
                                fill: 'white',
                                position: 'relative',
                                top: '17px',
                                display: 'flex',
                                left: '50px'
                            }}
                            height={'14px'}
                            src='/edit-white.svg'
                            alt='Bewerk module' />
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