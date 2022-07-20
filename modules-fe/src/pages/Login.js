import { useRef, useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthProvider'
import Logo from "../components/Logo"
import PageTitle from '../components/PageTitle'
import { useAPICall } from '../components/APICalls'

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const usernameRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);

    // API call to module server (being forwarded to BE server) We need JWT token for all API access, not just login.
    const loginAPI = useAPICall('/api/v1/get-token')

    useEffect(() => {
        usernameRef.current.focus()
    }, [])

    const useSubmitLogin = async (e) => {
        e.preventDefault()
        try {
            const object = await loginAPI.post({ username, password })
            if (object.response.status === 200) {
                const accessToken = object.data?.access
                const refreshToken = object.data?.refresh
                const data = { access: accessToken, refresh: refreshToken }
                setAuth(data)
                setUsername('')
                setPassword('')
                setSuccess(true)
            } else {
                setUsername('')
                setPassword('')
            }
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