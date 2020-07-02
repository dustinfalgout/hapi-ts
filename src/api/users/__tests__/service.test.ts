import { User } from '../model'
import { UserDal } from '../dal'
import { CreateUser } from '../types'
import * as Sequelize from 'sequelize'

jest.mock('sequelize')

describe('User Dal', () => {
  const userDal = new UserDal()

  describe('create', () => {
  it('should create a user', async () => {
      const createUser = new CreateUser('foo')
      const returnedUser = new User()
      returnedUser.name = createUser.name

      const mockedModel = Sequelize.Model
      mockedModel.create = jest.fn().mockResolvedValueOnce(returnedUser)
      const createSpy = jest.spyOn(mockedModel, 'create')
      
      const result: User = await userDal.create(createUser)

      expect(createSpy).toBeCalledTimes(1)
      expect(result.name).toEqual(createUser.name)
    })
  })
})