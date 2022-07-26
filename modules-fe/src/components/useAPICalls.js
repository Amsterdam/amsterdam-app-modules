import { ApiServer, EndPoints } from "./APIRoutes"
import { useContext } from "react"
import AuthContext from '../context/AuthProvider'

const useAPICalls = () => {
    const { auth, setAuth } = useContext(AuthContext)

    function setUrl(path, params) {
        let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&')
        let apiServer = ApiServer()
        let paths = EndPoints()
        return apiServer + paths[path] + queryString
    }

    function setHeaders() {
        let header = { 'Content-type': 'application/json' }
        if (auth.access) { header.authorization = auth.access }
        return header
    }

    const getMethod = async (path, query) => {
        const url = setUrl(path, query)
        const headers = setHeaders()

        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        })
        const data = await response.json()
        return { data, response }
    }

    const postMethod = async (path, query, payload) => {
        const url = setUrl(path, query)
        const headers = setHeaders()

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        })
        const data = await response.json()
        return { data, response }
    }

    const patchMethod = async (path, query, payload) => {
        const url = setUrl(path, query)
        const headers = setHeaders()

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
        const headers = setHeaders()

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
