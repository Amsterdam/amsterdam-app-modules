class APIDocs:
    response_200 = {
        "description": "Response status",
        "schema": {
            "type": "object",
            "properties": {
                "status": {
                    "type": "boolean",
                    "description": "Response status"
                },
                "result": {
                    "type": "string",
                    "description": "Human readable status result"
                }
            }
        }
    }

    response_400 = {
        "description": "Error: BAD REQUEST",
        "schema": {
            "type": "object",
            "properties": {
                "status": {
                    "type": "boolean",
                    "description": "Response status"
                },
                "result": {
                    "type": "object",
                    "description": "Swagger validation report",
                    "properties": {
                        "error": {
                            "type": "string",
                            "description": "error message"
                        },
                        "request_body": {
                            "type": "object",
                            "description": "request body from consumer"
                        },
                        "schema": {
                            "type": "object",
                            "description": "valid schema"
                        },
                        "required": {
                            "type": "array",
                            "description": "required schema items",
                            "items": {
                                "type": "string",
                                "description": "schema items"
                            }
                        }
                    }
                }
            }
        }
    }

    response_401 = {
        "description": "Access forbidden",
        "schema": {
            "type": "object",
            "properties": {
                "status": {
                    "type": "boolean",
                    "description": "Response status"
                },
                "result": {
                    "type": "string",
                    "description": "Access forbidden"
                }
            }
        }
    }

    response_404 = {
        "description": "No such object",
        "schema": {
            "type": "object",
            "properties": {
                "status": {
                    "type": "boolean",
                    "description": "Response status"
                },
                "result": {
                    "type": "string",
                    "description": "No such object"
                }
            }
        }
    }

    response_422 = {
        "description": "Error: UNPROCESSABLE ENTITY",
        "schema": {
            "type": "object",
            "properties": {
                "status": {
                    "type": "boolean",
                    "description": "Response status"
                },
                "result": {
                    "type": "string",
                    "description": "Error: UNPROCESSABLE ENTITY"
                }
            }
        }
    }

    response_504 = {
        "description": "The up-stream server for storing modules could not be reached",
        "schema": {
            "type": "object",
            "properties": {
                "status": {
                    "type": "boolean",
                    "description": "Response status"
                },
                "result": {
                    "type": "string",
                    "description": "504 Gateway timeout"
                }
            }
        }
    }

    enum_status = 'The current state of this module\n\n'
    enum_status += '0: inactive\n'
    enum_status += '1: active'

    version = {
        "type": "string",
        "description": "Version number"
    }

    slug = {
        "type": "string",
        "description": "Unique human readable identifier (Slug)"
    }

    status = {
        "type": "integer",
        "description": enum_status
    }

    title = {
        "type": "string",
        "description": "Descriptive title"
    }

    icon = {
        "type": "string",
        "description": "Icon name"
    }

    description = {
        "type": "string",
        "description": "Description"
    }

    modules_by_app = {
        "appVersion": version,
        "moduleSlug": slug,
        "moduleVersion": version,
        "status": status
    }

    modules = {
        "slug": slug,
        "title": title,
        "icon": icon,
        "version": version,
        "description": description
    }

    modules_get = {
        "tags": ["Modules"],
        "summary": "Get modules",
        "parameters": [
            {
                "name": "slug",
                "in": "query",
                "required": True,
                "type": "string",
                "description": "slug for requesting modules"
            }
        ],
        "responses": {
            "200": {
                "description": "Status and list of modules",
                "schema": {
                    "type": "object",
                    "properties": {
                        "status": {
                            "type": "boolean",
                            "description": "Response status"
                        },
                        "result": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": modules
                            }
                        }
                    }
                }
            },
            "400": {
                "description": "Bad request",
                "schema": {
                    "type": "object",
                    "properties": {
                        "status": {
                            "type": "boolean",
                            "description": "Response status"
                        },
                        "result": {
                            "type": "string",
                            "description": "error message"
                        }
                    }
                }
            },
            "504": response_504
        }
    }

    modules_post = {
        "tags": ["Modules"],
        "summary": "Create a module",
        "parameters": [
            {
                "name": "Authorization",
                "in": "header",
                "required": True,
                "type": "string",
                "description": "Authorization header based on uuid and AES_SECRET"
            },
            {
                "name": "body",
                "in": "body",
                "schema": {
                    "id": "module_post",
                    "required": ["slug", "title", "icon", "version", "description"],
                    "properties": modules
                }
            }
        ],
        "responses": {
            "200": response_200,
            "400": response_400,
            "401": response_401,
            "422": response_422,
            "504": response_504
        }
    }

    modules_patch = {
        "tags": ["Modules"],
        "summary": "Patch a module definition for given Slug and App version",
        "parameters": [
            {
                "name": "Authorization",
                "in": "header",
                "required": True,
                "type": "string",
                "description": "Authorization header based on uuid and AES_SECRET"
            },
            {
                "name": "body",
                "in": "body",
                "schema": {
                    "id": "module_patch",
                    "required": ["slug", "version"],
                    "properties": modules
                }
            }
        ],
        "responses": {
            "200": response_200,
            "400": response_400,
            "401": response_401,
            "504": response_504
        }
    }

    modules_delete = {
        "tags": ["Modules"],
        "summary": "delete a module definition witch given Slug and App version",
        "parameters": [
            {
                "name": "Authorization",
                "in": "header",
                "required": True,
                "type": "string",
                "description": "Authorization header based on uuid and AES_SECRET"
            },
            {
                "name": "body",
                "in": "body",
                "schema": {
                    "id": "module_delete",
                    "required": ["slug", "version"],
                    "properties": {
                        "slug": slug,
                        "version": version
                    }
                }
            }
        ],
        "responses": {
            "200": response_200,
            "400": response_400,
            "401": response_401,
            "504": response_504
        }
    }

    modules_by_app_get = {
        "tags": ["Modules by App"],
        "summary": "Get list of active modules for appVersion",
        "consumes": ["application/json"],
        "produces": ["application/json"],
        "parameters": [
            {
                "name": "appVersion",
                "in": "query",
                "required": True,
                "type": "string",
                "description": "appVersion for requesting modules"
            }
        ],
        "responses": {
            "200": {
                "description": "Status and list of modules",
                "schema": {
                    "type": "object",
                    "properties": {
                        "status": {
                            "type": "boolean",
                            "description": "Response status"
                        },
                        "result": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "description": "Modules",
                                "properties": modules_by_app
                            }
                        }
                    }
                }
            },
            "400": {
                "description": "Bad request",
                "schema": {
                    "type": "object",
                    "properties": {
                        "status": {
                            "type": "boolean",
                            "description": "Response status"
                        },
                        "result": {
                            "type": "string",
                            "description": "error message"
                        }
                    }
                }
            },
            "504": response_504
        }
    }

    modules_by_app_post = {
        "tags": ["Modules by App"],
        "summary": "Create a module",
        "parameters": [
            {
                "name": "Authorization",
                "in": "header",
                "required": True,
                "type": "string",
                "description": "Authorization header based on uuid and AES_SECRET"
            },
            {
                "name": "body",
                "in": "body",
                "schema": {
                    "id": "module_by_app_post",
                    "required": ["appVersion", "moduleSlug", "moduleVersion", "status"],
                    "properties": modules_by_app
                }
            }
        ],
        "responses": {
            "200": response_200,
            "400": response_400,
            "401": response_401,
            "504": response_504
        }
    }

    modules_by_app_patch = {
        "tags": ["Modules by App"],
        "summary": "Patch a module-by-app",
        "parameters": [
            {
                "name": "Authorization",
                "in": "header",
                "required": True,
                "type": "string",
                "description": "Authorization header based on uuid and AES_SECRET"
            },
            {
                "name": "body",
                "in": "body",
                "schema": {
                    "id": "module_by_app_patch",
                    "required": ["appVersion", "moduleSlug"],
                    "properties": modules_by_app
                }
            }
        ],
        "responses": {
            "200": response_200,
            "400": response_400,
            "401": response_401,
            "504": response_504
        }
    }

    modules_by_app_delete = {
        "tags": ["Modules by App"],
        "summary": "Delete a module-by-app",
        "parameters": [
            {
                "name": "Authorization",
                "in": "header",
                "required": True,
                "type": "string",
                "description": "Authorization header based on uuid and AES_SECRET"
            },
            {
                "name": "body",
                "in": "body",
                "schema": {
                    "id": "modules_by_app_delete",
                    "required": ["appVersion", "moduleSlug"],
                    "properties": {
                        "appVersion": version,
                        "moduleSlug": slug
                    }
                }
            }
        ],
        "responses": {
            "200": response_200,
            "400": response_400,
            "401": response_401,
            "504": response_504
        }
    }

    module_order_get = {
        "tags": ["Module Order"],
        "summary": "Slug order for appVersion",
        "produces": ["application/json"],
        "parameters": [
            {
                "name": "appVersion",
                "in": "header",
                "required": True,
                "type": "string",
                "description": "appVersion for requesting module order"
            }
        ],
        "responses": {
            "200": {
                "description": "Status and list of modules",
                "schema": {
                    "type": "object",
                    "properties": {
                        "status": {
                            "type": "boolean",
                            "description": "Response status"
                        },
                        "result": {
                            "type": "array",
                            "items": slug
                        }
                    }
                }
            },
            "400": {
                "description": "Bad request",
                "schema": {
                    "type": "object",
                    "properties": {
                        "status": {
                            "type": "boolean",
                            "description": "Response status"
                        },
                        "result": {
                            "type": "string",
                            "description": "error message"
                        }
                    }
                }
            },
            "504": response_504
        }
    }

    module_order_post = {
        "tags": ["Module Order"],
        "summary": "Slug order for appVersion",
        "parameters": [
            {
                "name": "Authorization",
                "in": "header",
                "required": True,
                "type": "string",
                "description": "Authorization header based on uuid and AES_SECRET"
            },
            {
                "name": "body",
                "in": "body",
                "required": True,
                "schema": {
                    "id": "module_order_post",
                    "required": ["appVersion", "order"],
                    "properties": {
                        "appVersion": version,
                        "order": {
                            "type": "array",
                            "items": slug
                        }
                    }
                }
            }
        ],
        "responses": {
            "200": response_200,
            "400": response_400,
            "401": response_401,
            "504": response_504
        }
    }

    module_order_patch = {
        "tags": ["Module Order"],
        "summary": "Slug order for appVersion",
        "parameters": [
            {
                "name": "Authorization",
                "in": "header",
                "required": True,
                "type": "string",
                "description": "Authorization header based on uuid and AES_SECRET"
            },
            {
                "name": "body",
                "in": "body",
                "required": True,
                "schema": {
                    "id": "module_order_patch",
                    "required": ["appVersion", "order"],
                    "properties": {
                        "appVersion": version,
                        "order": {
                            "type": "array",
                            "items": slug
                        }
                    }
                }
            }
        ],
        "responses": {
            "200": response_200,
            "400": response_400,
            "401": response_401,
            "404": response_404,
            "422": response_422,
            "504": response_504
        }
    }

    module_order_delete = {
        "tags": ["Module Order"],
        "summary": "Slug order for appVersion",
        "parameters": [
            {
                "name": "Authorization",
                "in": "header",
                "required": True,
                "type": "string",
                "description": "Authorization header based on uuid and AES_SECRET"
            },
            {
                "name": "body",
                "in": "body",
                "required": True,
                "schema": {
                    "id": "module_order_delete",
                    "required": ["appVersion"],
                    "properties": {
                        "appVersion": version
                    }
                }
            }
        ],
        "responses": {
            "200": response_200,
            "400": response_400,
            "401": response_401,
            "504": response_504
        }
    }

    modules_for_app_get = {
        "tags": ["Modules for App"],
        "summary": "Get list of modules for appVersion",
        "consumes": ["application/json"],
        "produces": ["application/json"],
        "parameters": [
            {
                "name": "appVersion",
                "in": "header",
                "required": True,
                "type": "string",
                "description": "appVersion for requesting modules"
            }
        ],
        "responses": {
            "200": {
                "description": "Status and list of modules",
                "schema": {
                    "type": "object",
                    "properties": {
                        "status": {
                            "type": "boolean",
                            "description": "Response status"
                        },
                        "result": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "description": "Modules",
                                "properties": {
                                    "description": description,
                                    "slug": slug,
                                    "title": title,
                                    "icon": icon,
                                    "status": status,
                                    "version": version
                                }
                            }
                        }
                    }
                }
            },
            "400": {
                "description": "Bad request",
                "schema": {
                    "type": "object",
                    "properties": {
                        "status": {
                            "type": "boolean",
                            "description": "Response status"
                        },
                        "result": {
                            "type": "string",
                            "description": "error message"
                        }
                    }
                }
            },
            "504": response_504
        }
    }