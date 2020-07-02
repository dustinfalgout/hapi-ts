import * as Hapi from '@hapi/hapi'
import * as AuthBearer from 'hapi-auth-bearer-token'

const register = async (server: Hapi.Server) => {
  await server.register(AuthBearer)

  server.auth.strategy('bearer', 'bearer-access-token', {
    validate: async (request, token, h) => {
      const isValid = token === '1234'

      const credentials = { token }
      const artifacts = {
        username: 'Dustin',
        roles: ['ROLE_ADMIN']
      }

      return { isValid, credentials, artifacts }
    }
  })

  server.auth.default('bearer')
}

export default {
  name: 'auth',
  version: '1.0.0',
  register
}