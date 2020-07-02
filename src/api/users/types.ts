export class CreateUser {
  public name!: string

  constructor (name: string) {
    this.name = name
  }
}

export class CreateProject {
  public name!: string
}