import { createContext, useEffect, useState } from "react"

const AuthContext = createContext({})

// retrieve login on page refresh
let localStorageAuthState = JSON.parse(window.localStorage.getItem('auth')) ?? {}

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(localStorageAuthState)

    useEffect(() => {
        // persist login in local storage
        window.localStorage.setItem('auth', JSON.stringify(auth));
    }, [auth, auth.access, auth.refresh])
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
