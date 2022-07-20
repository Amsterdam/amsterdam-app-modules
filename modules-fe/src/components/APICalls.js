import { useState, useEffect } from "react"

const apiServer = 'http://172.16.100.117:9000'

// Fetch Tasks
export function useAPICall(path) {
    const url = apiServer + path
    const [data, setData] = useState([])

    async function getMethod(_url) {
        try {
            const response = await fetch(_url)
            const data = await response.json()
            setData(data)
            return { data, response }
        } catch (error) {
            return {}
        }
    }

    async function postMethod(payload) {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(payload)
        })
        const data = await response.json()
        getMethod()
        return { data, response }
    }

    async function patchMethod(payload) {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(payload)
        })
        const data = await response.json()
        getMethod()
        return { data, response }
    }

    async function deleteMethod(payload) {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(payload)
        })
        const data = await response.json()
        getMethod()
        return { data, response }
    }

    useEffect(() => {
        getMethod(url)
    }, [url])

    return { 'data': data, 'post': postMethod, 'patch': patchMethod, 'delete': deleteMethod }
}