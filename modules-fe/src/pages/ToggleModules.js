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
    const [modulesForApp, setModulesForApp] = useState([])
    const { getMethod } = useAPICalls()

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
        console.log(slug)
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
            </div>
        </div>
    )
}

export default ToggleModules