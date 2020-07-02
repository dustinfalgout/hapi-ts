import * as Hapi from '@hapi/hapi'

const register = async (server: Hapi.Server) => {
  server.ext('onCredentials', (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
    if (request.auth.strategy === 'bearer') {
      const allow = request.route.settings.plugins.credentials.allow || []
      const auth: Hapi.CustomRequestAuth = request.auth as Hapi.CustomRequestAuth
      const roles: string[] = auth.artifacts.roles
      const authorized: boolean = roles
        .filter((role: string) => allow.length > 0 ? allow.includes(role) : true)
        .length > 0
      if (authorized) return h.continue
      return h.unauthenticated
    }
    return h.continue
  })
}

export default {
    name: 'credentials',
    version: '1.0.0',
    register
}