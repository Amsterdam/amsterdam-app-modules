import { useRef, useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthProvider'
import Logo from "../components/Logo"
import PageTitle from '../components/PageTitle'
import useAPICalls from '../components/useAPICalls'

const Login = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const usernameRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const { postMethod } = useAPICalls()

    useEffect(() => {
        usernameRef.current.focus()
    }, [])

    const callLogin = async () => {
        console.log('HIERO', postMethod)
        // DEBUG TODO: remove
        const payload = { username: 'redactie@amsterdam.nl', password: 'gd@3bFC12' }
        const object = await postMethod('get-token', {}, payload)
        if (object.response.status === 200) {
            const accessToken = object.data?.access
            const refreshToken = object.data?.refresh
            const data = { access: accessToken, refresh: refreshToken }
            setAuth(data)
            setSuccess(true)
        }
    }

    // DEBUG
    callLogin()

    const useSubmitLogin = async (e) => {
        e.preventDefault()
        try {
            callLogin()
            setUsername('')
            setPassword('')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {success
                ? (<h1>je bent ingelogd</h1>)
                : (
                    <div>
                        {/* Logo */}
                        <Logo />

                        {/* Title component */}
                        <PageTitle pageTitle='Inloggen' />

                        {/* Login form */}
                        <form onSubmit={useSubmitLogin}>
                            <input
                                className='username'
                                type='text'
                                id='username'
                                placeholder='E-mail'
                                ref={usernameRef}
                                autoComplete=""
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                required />

                            <input
                                className='password'
                                type='password'
                                id='password'
                                placeholder='Wachtwoord'
                                autoComplete=""
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required />

                            <button className='submitlogin'>
                                <span className='submitlogintext'>Inloggen</span>
                            </button>
                        </form>

                        <div className="loginimage" />
                    </div >
                )}
        </>
    )
}

export default Login