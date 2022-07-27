import { useState, useEffect } from "react"
import Logo from "../components/Logo"
import Navigation from "../components/Navigation"
import PageTitle from '../components/PageTitle'
import InputField from "../components/InputField"
import useAPICalls from "../components/useAPICalls"

const NewModule = () => {
    const [error, setError] = useState('')
    const [slug, setSlug] = useState('')
    const [title, setTitle] = useState('')
    const [icon, setIcon] = useState('')
    const [description, setDescription] = useState('')
    const [version, setVersion] = useState('')
    const { postMethod } = useAPICalls()

    useEffect(() => {
        setError('')
    }, [slug, title, icon, description, version])

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
            const object = await postMethod('modules', {}, payload)
            if (object.response.status === 200) {
                setSlug('')
                setTitle('')
                setIcon('')
                setDescription('')
                setVersion('')
            } else {
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
            <Navigation location='/' text='Terug' />

            {/* Title component */}
            <PageTitle pageTitle='Nieuwe module' />

            {/* Input fields*/}
            <div className='page_body'>
                <form style={{ maxWidth: '344px' }} onSubmit={useSubmit}>
                    <InputField identifier={'Slug'} value={slug} setValue={setSlug} />
                    <InputField identifier={'Title'} value={title} setValue={setTitle} />
                    <InputField identifier={'Icon'} value={icon} setValue={setIcon} />
                    <InputField identifier={'Description'} value={description} setValue={setDescription} />
                    <InputField identifier={'Version'} value={version} setValue={setVersion} />

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
                        <span className='submitlogintext'>Voeg module toe</span>
                    </button>
                </form>
            </div>
        </div >
    )
}

export default NewModule