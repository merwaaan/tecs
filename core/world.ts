/// <reference path='entity.ts' />
/// <reference path='system.ts' />

module Core {

  export class World {
    private entities: Core.Entity[]
    private systems: Core.System[]

    constructor() {
      this.entities = []
      this.systems = []
    }

    createEntity(): Core.Entity {
      const e = new Core.Entity(this)
      this.entities.push(e)
      return e
    }

    createSystem(systemType): Core.System {
      const s = new systemType(this)
      this.systems.push(s)
      return s
    }

    update(t: number, dt: number) {
      this.systems.forEach(s => s.update(t, dt))
    }
  }

}
