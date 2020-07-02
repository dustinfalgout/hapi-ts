import * as Hapi from '@hapi/hapi'
import * as HapiSwagger from 'hapi-swagger'
const Pack = require('../../../package')

const options = {
    info:   {
        title: 'Service API Documentation',
        version: Pack.version,
    },
    tags: [
        {
          name: 'users',
          description: 'the users api'
        },
    ],
    grouping: 'tags',
    securityDefinitions: {
        bearer: {
            'type': 'apiKey',
            'name': 'Authorization',
            'in': 'header'
        }
    },
    security: [
        { bearer: [] }
    ]
}

const register = async (server: Hapi.Server) => {
  try {
    return server.register({
      plugin: HapiSwagger,
      options
    })
  } catch (err) {
    console.log(`failed to register plugin: ${err}`)
    throw err
  }
}

export default {
  name: 'swagger',
  version: '1.0.0',
  register
}