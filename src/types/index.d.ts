import '@hapi/hapi'

declare module '@hapi/hapi' {
  // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/hapi__hapi/index.d.ts#L97
  interface PluginSpecificConfiguration {
    'credentials'?: {
      allow?: string[]
    }
  }

  interface CustomRequestAuth extends RequestAuth {
    artifacts: {
      roles: string[]
    }
  }
}
