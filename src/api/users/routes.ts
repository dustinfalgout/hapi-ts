import * as Hapi from '@hapi/hapi'
import * as Joi from '@hapi/joi'
import { UserController } from './controller'

const userPostPayload = Joi.object({
  name: Joi.string().required()
}).label('userPostPayload')

const projectPostPayload = Joi.object({
  name: Joi.string().required()
}).label('projectPostPayload')

export class UserRoutes {
  private _server: Hapi.Server
  private _userController: UserController

  constructor (server: Hapi.Server, userController: UserController) {
    this._server = server
    this._userController = userController
    this._server.bind(this._userController)
  }

  public init (): void {
    this._server.route({
      method: 'POST',
      path: '/users',
      options: {
        handler: this._userController.createUser,
        validate: {
          payload: userPostPayload,
        },
        plugins: {
          credentials: {
            allow: ['ROLE_ADMIN']
          }
        },
        tags: ['api', 'users'],
        description: 'Create a new user',
        notes: 'Returns a newly created user'
      }
    })
  
    this._server.route({
      method: 'GET',
      path: '/users',
      options: {
        handler: this._userController.findAll,
        plugins: {
          credentials: {
            allow: ['ROLE_ADMIN']
          }
        },
        tags: ['api', 'users'],
        description: 'Get a list of all users',
        notes: 'Returns a list of all users'
      }
    })
  
    this._server.route({
      method: 'GET',
      path: '/users/{id}',
      options: {
        handler: this._userController.findOne,
        validate: {
          params: Joi.object({
            id: Joi.string().required()
          })
        },
        plugins: {
          credentials: {
            allow: ['ROLE_ADMIN']
          }
        },
        tags: ['api', 'users'],
        description: 'Get a user by id',
        notes: 'Returns a user by id'
      }
    })
  
    this._server.route({
      method: 'DELETE',
      path: '/users/{id}',
      options: {
        handler: this._userController.deleteById,
        validate: {
          params: Joi.object({
            id: Joi.string().required()
          })
        },
        plugins: {
          credentials: {
            allow: ['ROLE_ADMIN']
          }
        },
        tags: ['api', 'users'],
        description: 'Delete a user by id',
        notes: 'Deletes a user by id'
      }
    })
  
    this._server.route({
      method: 'POST',
      path: '/users/{id}/project',
      options: {
        handler: this._userController.addProject,
        validate: {
          payload: projectPostPayload,
          params: Joi.object({
            id: Joi.string().required()
          })
        },
        plugins: {
          credentials: {
            allow: ['ROLE_ADMIN']
          }
        },
        tags: ['api', 'users'],
        description: 'Creates a unique project for a user',
        notes: 'Creates a unique project for a user'
      }
    })
  }
}