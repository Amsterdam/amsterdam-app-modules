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
                    "description": "Human readable status result"
                }
            }
        }
    }

    enum_status = 'The current state of this module version\n\n'
    enum_status += '0: inactive\n'
    enum_status += '1: active'

    module_properties = {
        "slug": {
            "type": "string",
            "description": "Unique human readable identifier"
        },
        "version": {
            "type": "string",
            "description": "Module version number (eg. 1.0.0)"
        },
        "app_version": {
            "type": "string",
            "description": "Mobile App version number (eg. 1.0.0)"
        },
        "title": {
            "type": "string",
            "description": "Name for this module"
        },
        "description": {
            "type": "string",
            "description": "A module description"
        },
        "icon": {
            "type": "string",
            "description": "Icon name used for this module"
        },
        "status": {
            "type": "integer",
            "description": enum_status
        }
    }

    modules_properties = {
        "slug": {
            "type": "string",
            "description": "Unique human readable identifier"
        },
        "version": {
            "type": "string",
            "description": "Module version number (eg. 1.0.0)"
        },
        "title": {
            "type": "string",
            "description": "Name for this module"
        },
        "description": {
            "type": "string",
            "description": "A module description"
        },
        "icon": {
            "type": "string",
            "description": "Icon name used for this module"
        },
        "status": {
            "type": "integer",
            "description": enum_status
        }
    }

    module_post = {
        "tags": ["Modules"],
        "summary": "Create a module definition for given Slug and App version",
        "parameters": [
            {
                "name": "body",
                "in": "body",
                "schema": {
                    "id": "module_post",
                    "required": ["slug", "version", "app_version", "title", "description", "icon", "status"],
                    "properties": module_properties
                }
            }
        ],
        "responses": {
            "200": response_200,
            "400": response_400,
            "504": response_504
        }
    }

    module_patch = {
        "tags": ["Modules"],
        "summary": "Patch a module definition for given Slug and App version",
        "parameters": [
            {
                "name": "body",
                "in": "body",
                "schema": {
                    "id": "module_patch",
                    "required": ["slug", "app_version"],
                    "properties": module_properties
                }
            }
        ],
        "responses": {
            "200": response_200,
            "400": response_400,
            "504": response_504
        }
    }

    module_order = {
        "tags": ["Modules"],
        "summary": "Create or patch the Slug order for given app-version",
        "parameters": [
            {
                "name": "body",
                "in": "body",
                "required": True,
                "schema": {
                    "id": "module_order",
                    "required": ["app_version", "order"],
                    "properties": {
                        "app_version": {
                            "type": "string",
                            "description": "Mobile App version number (eg. 1.0.0)"
                        },
                        "order": {
                            "type": "array",
                            "items": {
                                "type": "string",
                                "description": "Slugs"
                            }
                        }
                    }
                }
            }
        ],
        "responses": {
            "200": response_200,
            "400": response_400,
            "504": response_504
        }
    }

    modules = {
        "tags": ["Modules"],
        "summary": "Get list of active modules for given Mobile-App version",
        "consumes": ["application/json"],
        "produces": ["application/json"],
        "parameters": [
            {
                "name": "App-Version",
                "in": "header",
                "required": True,
                "type": "string",
                "description": "Mobile-App version for requesting modules"
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
                                "properties": modules_properties
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