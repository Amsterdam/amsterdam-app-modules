export function ApiServer() {
  return window.location.origin;
}
export const endpoints = {
  // LOGIN
  "get-token": "/api/v1/get-token",
  "refresh-token": "/api/v1/refresh-token",

  // Available versions
  "app-versions": "/api/v1/modules_app_versions",

  // Get Module
  module: "/api/v1/module",

  // CRUD Modules
  modules: "/api/v1/modules",

  // CRUD Module by app
  modules_by_app: "/api/v1/modules_by_app",

  // CRUD Module order
  modules_order: "/api/v1/modules_order",

  // Get Modules for app version (header: appVersion: <string>)
  modules_for_app: "/api/v1/modules_for_app",
};
export type Endpoints = keyof typeof endpoints;
