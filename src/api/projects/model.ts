import {
  DataTypes,
  Model,
  Sequelize
} from 'sequelize'

export class Project extends Model {
  public id!: number
  public userId!: number
  public name!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

export function init(sequelize: Sequelize): void {
  Project.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: new DataTypes.TEXT,
        allowNull: false,
      }
    },
    {
      tableName: 'Projects',
      sequelize
    }
  )
}