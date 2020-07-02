import * as Hapi from '@hapi/hapi'
import * as UserTypes from './types'
import { User } from './model'
import { UserDal } from './dal'

export class UserController {
  private _userDal: UserDal

  constructor (userDal: UserDal) {
    this._userDal = userDal
  }

  public async createUser (request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> {
    try {
      const createUser: UserTypes.CreateUser = request.payload as UserTypes.CreateUser
      const user: User = await this._userDal.create(createUser)
      request.log('info', `created this ${user}`)
      return h.response({ user })
    } catch (error) {
      request.log('error', error.message)
      return h.response().message(error.message).code(404)
    }
  }

  public async findAll (request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> {
    try {
      const users: User[] = await this._userDal.findAll()
      request.log('info', `returned ${users.length} users`)
      return h.response({ users })
    } catch (error) {
      request.log('error', error.message)
      return h.response().message(error).code(404)
    }
  }

  public async findOne (request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> {
    try {
      const user: User = await this._userDal.findOne(request.params.id)
      request.log('info', `returned ${user}`)
      return h.response({ user })
    } catch (error) {
      request.log('error', error.message)
      return h.response().message(error.message).code(404)
    }
  }

  public async deleteById (request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> {
    try {
      const deleted: boolean = await this._userDal.deleteById(request.params.id)
      if (deleted) {
        request.log('info', `Successfully deleted userId ${request.params.id}`)
        return h.response('Successfully deleted').code(201)
      }
      throw new Error('User not Deleted')
    } catch (error) {
      request.log('error', error.message)
      return h.response().message(error.message).code(404)
    }
  }

  public async addProject (request: Hapi.Request, h: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> {
    try {
      const project: UserTypes.CreateProject = request.payload as UserTypes.CreateProject
      const user: User = await this._userDal.addProject(request.params.id, project)
      request.log('info', `added project ${user}`)
      return h.response({ user })
    } catch (error) {
      request.log('error', error.message)
      return h.response().message(error.message).code(404)
    }
  }
}