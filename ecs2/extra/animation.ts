/// <reference path='rendering.ts' />

module Rendering {

  interface Frame {
    position: Vec2
    dimensions: Vec2
  }

  interface CAnimatedOptions {
    frames: Frame[]
    speed: number
  }

  export class CAnimated extends Core.Component {
    frames: Frame[]
    speed: number

    constructor(entity: Core.Entity, options: CAnimatedOptions) {
      super(entity, options)

    }
  }

  export class SAnimation extends Core.System {
    constructor(world) {
      super(world)
    }

    shouldBindEntity(entity) {
      return entity.has(CAnimated, CSprite)
    }

    update(t, dt) {
      this.boundEntities.forEach((e) => {
        const a = e.get(CAnimated) as CAnimated
        const s = e.get(CSprite) as CSprite


      })
    }

}
