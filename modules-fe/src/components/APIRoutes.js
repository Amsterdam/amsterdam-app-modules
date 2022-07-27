export function ApiServer() { return 'http://172.16.100.117:9000' }
export function EndPoints() {
    return {
        // LOGIN
        'get-token': '/api/v1/get-token',
        'refresh-token': '/api/v1/refresh-token',

        // Available versions
        'app-versions': '/api/v1/modules_app_versions',

        // CRUD Module
        'modules': '/api/v1/modules',

        // CRUD Module by app
        'modules_by_app': '/api/v1/modules_by_app',

        // CRUD Module order
        'modules_order': '/api/v1/modules_order',

        // Get Modules for app version (header: appVersion: <string>)
        'modules_for_app': '/api/v1/modules_for_app'
    }
}
