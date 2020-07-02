import {
  Association,
  Model,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Sequelize,
  DataTypes
} from 'sequelize'
import { Project } from '../projects/model'

export class User extends Model {
  public id!: number
  public name!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public getProjects!: HasManyGetAssociationsMixin<Project>
  public addProject!: HasManyAddAssociationMixin<Project, number>
  public hasProject!: HasManyHasAssociationMixin<Project, number>
  public countProjects!: HasManyCountAssociationsMixin
  public createProject!: HasManyCreateAssociationMixin<Project>

  public readonly projects?: Project[]

  public static associations: {
    projects: Association<User, Project>
  }
}

export function init(sequelize: Sequelize): void {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: 'Users',
      sequelize
    }
  )

  User.hasMany(Project, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'projects' // this determines the name in `associations`!
  })
}