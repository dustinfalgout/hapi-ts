import { User } from './model'
import * as UserTypes from './types'

export class UserDal {
  public async create (createUser: UserTypes.CreateUser): Promise<User> {
    return await User.create(createUser)
  }

  public async findAll (): Promise<User[]> {
    return await User.findAll({ include: ['projects'] })
  }

  public async findOne (id: string): Promise<User> {
    return await User.findOne({ where: { id } })
  }

  public async deleteById (id: string): Promise<boolean> {
    const rows: number = await User.destroy({ where: { id } })
    return rows > 0
  }

  public async addProject (id: string, createProject: UserTypes.CreateProject): Promise<User> {
    const user: User = await User.findOne({ where: { id }, include: ['projects'] })
    let result: User = user
    if (user) {
      if (!user.projects.map(p => p.name).includes(createProject.name)) {
        await user.createProject({ name: createProject.name })
        result = user.reload()
      }
    }
    return result
  }
}