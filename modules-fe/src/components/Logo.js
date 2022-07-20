import { useContext } from "react"
import AuthContext from "../context/AuthProvider"

const Logo = () => {
    const authContext = useContext(AuthContext)
    const hasAccessToken = authContext.auth.hasOwnProperty('access')

    return (
        <div className="logo">
            {hasAccessToken && (
                <img
                    className="aangemeld"
                    src='/Shape.svg'
                    alt='Aangemeld' />
            )}
        </div>
    )
}

export default Logo