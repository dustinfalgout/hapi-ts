import * as Hapi from '@hapi/hapi'
import * as Inert from '@hapi/inert'
import * as Vision from '@hapi/vision'
import Logger from './plugins/logger'
import Auth from './plugins/authentication'
import Credentials from './plugins/credentials'
import Swagger from './plugins/swagger'
import { Sequelize } from 'sequelize'
import * as UsersModel from './api/users/model'
import * as ProjectsModel from './api/projects/model'
import { UserDal } from './api/users/dal'
import { UserController } from './api/users/controller'
import { UserRoutes } from './api/users/routes'

process.on('unhandledRejection', (error: Error) => {
  console.error(`unhandledRejection ${error.message}`)
  process.exit(1)
})

process.on('uncaughtException', (error: Error) => {
  console.error(`uncaughtException ${error.message}`)
  process.exit(1)
})

const start = async function () {
  try {
    const server = new Hapi.Server({
      debug: {
        request: ['error', 'info']
      },
      port: 3000,
      routes: {
        cors: {
          origin: ['*']
        }
      }
    })

    await server.register([
      Inert,
      Vision,
      Logger,
      Auth,
      Credentials,
      Swagger,
    ])

    const sequelize = new Sequelize('postgres://some_user:password@localhost:5432/some_db')
    ProjectsModel.init(sequelize)
    UsersModel.init(sequelize)

    const userDal: UserDal = new UserDal()
    const userController: UserController = new UserController(userDal)
    new UserRoutes(server, userController).init()

    await server.start()
  } catch (err) {
    console.log(err)
    throw err
  }
}

start()