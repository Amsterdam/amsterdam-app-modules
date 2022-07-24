export function ApiServer() { return 'http://172.16.100.117:9000' }
export function EndPoints() {
    return {
        // LOGIN
        'get-token': '/api/v1/get-token',

        // Available versions
        'app-versions': '/api/v1/modules_app_versions'
    }
}
