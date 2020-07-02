import * as Pino from 'hapi-pino'
import * as Hapi from '@hapi/hapi'

const options = {
  prettyPrint: process.env.NODE_ENV !== 'production',
  // Redact Authorization headers, see https://getpino.io/#/docs/redaction
  redact: ['req.headers.authorization']
}

const register = async (server: Hapi.Server) => {
  try {
    return server.register({
      plugin: Pino,
      options
    })
  } catch (err) {
    console.log(`Error registering logger plugin: ${err}`)
  }
}

export default {
  name: 'logger',
  version: '1.0.0',
  register
}