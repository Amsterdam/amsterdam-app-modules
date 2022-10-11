import { createContext, useState } from "react"

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    // retrieve login on page refresh
    let data = JSON.parse(window.localStorage.getItem('auth'))
    if (data === null) {
        data = {}
    }
    const [auth, setAuth] = useState(data)

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
