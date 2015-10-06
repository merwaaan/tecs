
module Core {

  export class System {
    boundEntities: Entity[]

    constructor(public world: World) {
      this.boundEntities = []
    }

    update(t: number, dt: number) {}

    onAddComponent(component: Component) {
      if (this.shouldBind(component.entity))
        this.bind(component.entity)
    }

    onRemoveComponent(component: Component) {
      if (!this.shouldBind(component.entity))
        this.unbind(component.entity)
    }

    protected shouldBind(entity: Entity) {
      return false
    }

    protected bind(entity: Entity) {
      this.boundEntities.push(entity)
    }

    protected unbind(entity: Entity) {
      const index = this.boundEntities.indexOf(entity)
      if (index > -1)
        this.boundEntities.splice(index)
    }

  }

}
