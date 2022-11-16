import Logo from '../components/Logo'
import Navigation from '../components/Navigation'
import PageTitle from '../components/PageTitle'
import useAPICalls from '../components/useAPICalls'
import { useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import OrderModules from '../components/OrderModules'

const EditModules = () => {
    const { appversion } = useParams()
    const hasFetchedData = useRef(false)
    const newLog = useRef(false)
    const [modulesForApp, setModulesForApp] = useState([])
    const [log, setLog] = useState('')
    const { getMethod, patchMethod } = useAPICalls()

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

    useEffect(() => {
        if (newLog.current) {
            setTimeout(() => {
                setLog('')
                newLog.current = false
            }, 3000)
        }
    }, [log])

    const saveOrder = async () => {
        const order = modulesForApp.map(module => module.slug)
        let payload = {
            appVersion: appversion,
            order: order
        }

        const { data, response } = await patchMethod('modules_order', {}, payload)
        newLog.current = true
        setLog(data.result)
        if (response.status !== 200) {
            console.log('save modules order failed:', payload)
        }
    }

    return (
        <div>
            {/* Logo */}
            <Logo />

            {/* Navigation */}
            <Navigation location="/" text="Terug" />

            {/* Title component */}
            <PageTitle pageTitle="Bewerk modules" />

            <div className="page_body">
                <div
                    style={{
                        color: 'black',
                        marginLeft: '15px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        maxWidth: '344px'
                    }}
                >
                    Pas de volgorde aan door de modules te verslepen of wijzig de naam
                </div>

                {/* Modules for this appVersion */}
                <OrderModules appversion={appversion} modules={modulesForApp} setModules={setModulesForApp} />

                <div
                    style={{
                        maxWidth: 144,
                        color: 'red',
                        marginLeft: '15px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    {log}
                </div>

                <button className="saveButton" onClick={saveOrder}>
                    <span className="submitlogintext">Bewaar wijzigingen</span>
                </button>
            </div>
        </div>
    )
}

export default EditModules
