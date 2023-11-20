export class GenresClass {
  id: string
  name: string

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
  }

  static deserialize(input: any): GenresClass {
    return new GenresClass(input.id, input.name)
  }

  static deserializeList(input: any[]): GenresClass[] {
    console.log('input', input)
    return input?.map((room) => GenresClass.deserialize(room))
  }

  getId(): string {
    return this.id
  }

  getName(): string {
    return this.name
  }
}
