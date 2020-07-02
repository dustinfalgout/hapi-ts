import * as Hapi from '@hapi/hapi'
import { UserDal } from '../dal'
import { UserController } from '../controller'
import { UserRoutes } from '../routes'
import { CreateUser } from '../types'
import { User } from '../model'
import Credentials from '../../../plugins/credentials'
import Auth from '../../../plugins/authentication'
import { RequestOptions } from 'https'

jest.mock('../dal')

describe('users controller', () => {
  const server: Hapi.Server = Hapi.server({
    port: '3000',
  })

  beforeAll(async () => {
    await server.register([
      Auth,
      Credentials,
    ])
  })

  const userDalMock = new UserDal() as jest.Mocked<UserDal>

  describe('createUser', () => {
    it('should successfully create a user', async () => {
      const user = {
        id: 1,
        name: 'Dustin'
      }

      userDalMock.create.mockResolvedValueOnce(user as User)
      const spy = jest.spyOn(userDalMock, 'create')

      const userController = new UserController(userDalMock)
      new UserRoutes(server, userController).init()

      const payload: CreateUser = new CreateUser('Dustin')

      const result = await server.inject({
        method: 'POST',
        url: '/users',
        headers: {
          Authorization: 'Bearer 1234'
        },
        payload
      })

      expect(result.statusCode).toEqual(200)
      expect(spy).toBeCalledTimes(1)
      expect(result.result).toEqual({ user })
    })

    it('should fail create a user - unauthorized', async () => {
      const spy = jest.spyOn(userDalMock, 'create')

      const userController = new UserController(userDalMock)
      new UserRoutes(server, userController).init()

      const payload: CreateUser = new CreateUser('Dustin')

      const result = await server.inject({
        method: 'POST',
        url: '/users',
        headers: {
          Authorization: 'Bearer foo'
        },
        payload
      })

      expect(result.statusCode).toEqual(401)
    })
  })
})