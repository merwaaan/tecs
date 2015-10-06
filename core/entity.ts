/// <reference path='world.ts' />

// XXX temp
interface Array<T> {
    find(predicate: (T) => boolean) : T;
}

module Core {

  export class Entity {
    components: Component[]

    constructor(public world: World) {
      this.components = []
    }

    add(component: Component) {
        // TODO check if already own or something
        this.components.push(component)
        this.world.systems.forEach((s) => s.onAddComponent(component))
        return component
    }

    get(componentType: typeof Component){
      return this.components.find((c) =>
        c instanceof componentType
      )
    }

    has(...componentTypes: typeof Component[]) {
      return componentTypes.every((t) =>
        this.get(t) !== undefined
      )
    }
  }

}
