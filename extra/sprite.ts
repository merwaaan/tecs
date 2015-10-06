/// <reference path='rendering.ts' />

module Rendering {

  interface CSpriteOptions extends CDrawableOptions {
    image: HTMLImageElement
    position?: Vec2
    dimensions?: Vec2
  }

  export class CSprite extends CDrawable {
    image: HTMLImageElement
    position: Vec2
    dimensions: Vec2

    constructor(entity: Core.Entity, options: CSpriteOptions) {
      super(entity, options)

      this.image = options.image
      this.position = options.position || new Vec2(0, 0)
      this.dimensions = options.dimensions || new Vec2(this.image.width - this.position.x,
                                                       this.image.height - this.position.y)
    }
  }

}
