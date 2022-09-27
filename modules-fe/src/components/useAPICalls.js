import { ApiServer, EndPoints } from "./APIRoutes"
import { useContext } from "react"
import AuthContext from '../context/AuthProvider'

const useAPICalls = () => {
    const { auth, setAuth } = useContext(AuthContext)

    function setUrl(path, params) {
        let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&')
        let apiServer = ApiServer()
        let paths = EndPoints()
        return apiServer + paths[path] + (queryString ? '?' + queryString : '')
    }

    const setHeaders = async (extra_header) => {
        let header = { 'Content-type': 'application/json' }
        for (let i in extra_header) {
            header[i] = extra_header[i];
        }

        if (auth.refresh) {
            let token = await refreshToken()
            if (token) { header.authorization = token }
        }

        return header
    }

    const refreshToken = async () => {
        const headers = { 'Content-type': 'application/json' }
        const url = setUrl('refresh-token', {})
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ refresh: auth.refresh })
            })

            const data = await response.json()
            if (data.access) {
                setAuth({ access: data.access, refresh: auth.refresh })
                return data.access
            } else {
                setAuth({})
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const getMethod = async (path, query, extra_header) => {
        const url = setUrl(path, query)
        const headers = await setHeaders(extra_header)

        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        })
        const data = await response.json()
        return { data, response }
    }

    const postMethod = async (path, query, payload) => {
        const url = setUrl(path, query)
        const headers = await setHeaders({})

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload)
            })
            const data = await response.json()
            return { data, response }
        } catch (error) {
            console.log(error)
        }
    }

    const patchMethod = async (path, query, payload) => {
        const url = setUrl(path, query)
        const headers = await setHeaders({})

        const response = await fetch(url, {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(payload)
        })
        const data = await response.json()
        return { data, response }
    }

    const deleteMethod = async (path, query, payload) => {
        const url = setUrl(path, query)
        const headers = await setHeaders({})

        const response = await fetch(url, {
            method: 'DELETE',
            headers: headers,
            body: JSON.stringify(payload)
        })
        const data = await response.json()
        return { data, response }
    }

    return { getMethod, postMethod, patchMethod, deleteMethod }
}

export default useAPICalls
