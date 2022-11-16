import Logo from "../components/Logo"
import Navigation from "../components/Navigation"
import PageTitle from '../components/PageTitle'
import useAPICalls from "../components/useAPICalls"
import { useParams } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import EnableDisableModules from "../components/EnableDisableModules"

const ToggleModules = () => {
    const { appversion } = useParams()
    const hasFetchedData = useRef(false)
    const newLog = useRef(false)
    const [modulesForApp, setModulesForApp] = useState([])
    const { getMethod, patchMethod } = useAPICalls()
    const [log, setLog] = useState('')

    useEffect(() => {
        const getModulesByApp = async () => {
            const { data, response } = await getMethod('modules_for_app', {}, { appVersion: appversion })
            if (response.status === 200) {
                setModulesForApp(data.result)
            }
        }

        if (!hasFetchedData.current) {
            getModulesByApp()
            hasFetchedData.current = true
        }
    }, [appversion, getMethod])

    const onSwitch = (slug) => {
        setModulesForApp(modulesForApp.filter((module) => {
            if (module.slug === slug) {
                module.status = module.status === 0 ? 1 : 0
            }
            return module
        }))
        console.log(slug)
    }

    useEffect(() => {
        if (newLog.current) {
            setTimeout(() => {
                setLog('')
                newLog.current = false
            }, 3000);
        }
    }, [log]);

    const saveModules = async () => {
        for (let i in modulesForApp) {
            let payload = {
                "appVersion": appversion,
                "moduleSlug": modulesForApp[i].slug,
                "moduleVersion": modulesForApp[i].version,
                "status": modulesForApp[i].status
            }

            const { data, response } = await patchMethod('modules_by_app', {}, payload)
            newLog.current = true
            setLog(data.result)
            if (response.status !== 200) {
                console.log('save modules failed:', payload)
            }
        }
    }

    return (
        <div>
            {/* Logo */}
            <Logo />

            {/* Navigation */}
            <Navigation location='/' text='Terug' />

            {/* Title component */}
            <PageTitle pageTitle='Zet een module aan/uit' />

            <div className="page_body">
                {/* Toggle and modules for this appVersion */}
                <EnableDisableModules
                    modules={modulesForApp}
                    onSwitch={onSwitch} />

                <div style={{
                    color: 'red',
                    marginLeft: '15px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    {log}
                </div>

                <button
                    className='saveButton'
                    onClick={saveModules}>
                    <span className='submitlogintext'>Bewaar wijzigingen</span>
                </button>
            </div>
        </div>
    )
}

export default ToggleModules