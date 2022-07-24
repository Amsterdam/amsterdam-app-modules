import { ApiServer, EndPoints } from "./APIRoutes"

function setUrl(path, params) {
    let queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&')
    let apiServer = ApiServer()
    let paths = EndPoints()
    return apiServer + paths[path] + queryString
}

function setHeaders(token = null) {
    let header = { 'Content-type': 'application/json' }
    if (token !== null) { header.authorization = token }
    return header
}

export async function getMethod(path, query, token) {
    const url = setUrl(path, query)
    const headers = setHeaders(token)

    const response = await fetch(url, {
        method: 'GET',
        headers: headers
    })
    const data = await response.json()
    return { data, response }
}

export async function postMethod(path, query, payload, token) {
    const url = setUrl(path, query)
    const headers = setHeaders(token)

    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
    })
    const data = await response.json()
    return { data, response }
}

export async function usePatchMethod(path, query, payload, token) {
    const url = setUrl(path, query)
    const headers = setHeaders(token)

    const response = await fetch(url, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(payload)
    })
    const data = await response.json()
    return { data, response }
}

export async function useDeleteMethod(path, query, payload, token) {
    const url = setUrl(path, query)
    const headers = setHeaders(token)

    const response = await fetch(url, {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify(payload)
    })
    const data = await response.json()
    return { data, response }
}
