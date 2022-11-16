import Logo from "../components/Logo"
import Navigation from "../components/Navigation"
import PageTitle from '../components/PageTitle'
import useAPICalls from '../components/useAPICalls'
import InputField from "../components/InputField"
import { useParams } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'

const EditModule = () => {
    const { appversion, slug, version } = useParams()
    const hasFetchedData = useRef(false)
    const { getMethod, patchMethod } = useAPICalls()
    const [error, setError] = useState('')
    const [title, setTitle] = useState('')
    const [icon, setIcon] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        const getModule = async () => {
            const { data, response } = await getMethod('module', { slug: slug, version: version }, {})
            if (response.status === 200) {
                setTitle(data.result.title)
                setIcon(data.result.icon)
                setDescription(data.result.description)
            }
        }

        if (!hasFetchedData.current) {
            getModule()
            hasFetchedData.current = true
        }
    }, [slug, version, getMethod])

    const useSubmit = async (e) => {
        e.preventDefault()
        const payload = { slug: slug, title: title, icon: icon, description: description, version: version }

        // Check for empty values
        const emptyKeys = Object.keys(payload).filter((key) => payload[key] === '').join(', ')
        if (emptyKeys) {
            setError((emptyKeys + ' not set'))
            return
        }

        try {
            const object = await patchMethod('modules', {}, payload)
            if (object.response.status !== 200) {
                if (object.data.hasOwnProperty('result')) {
                    if (object.data.result.hasOwnProperty('error')) {
                        setError(object.data.result.error)
                    } else {
                        setError(object.data.result)
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {/* Logo */}
            <Logo />

            {/* Navigation */}
            <Navigation location={`/edit-modules/${appversion}`} text='Terug' />

            {/* Title component */}
            <PageTitle pageTitle='Module wijzigen' />

            {/* Input fields*/}
            <div className='page_body'>
                <form style={{ maxWidth: '344px' }} onSubmit={useSubmit}>
                    <InputField identifier={'Slug'} value={slug} readonly={true} />
                    <InputField identifier={'Title'} value={title} setValue={setTitle} />
                    <InputField identifier={'Icon'} value={icon} setValue={setIcon} />
                    <InputField identifier={'Description'} value={description} setValue={setDescription} />
                    <InputField identifier={'Version'} value={version} readonly={true} />

                    <div style={{
                        color: 'red',
                        marginLeft: '15px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        {error}
                    </div>

                    <button className='button-full-width'>
                        <span className='submitlogintext'>Bewaar wijziging</span>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditModule