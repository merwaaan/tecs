/// <reference path='../core/entity.ts' />
/// <reference path='../core/component.ts' />

/// <reference path='transform.ts' />
/// <reference path='drawable.ts' />
/// <reference path='square.ts' />
/// <reference path='sprite.ts' />

module Rendering {

  interface Layer {
    [layer: number]: Core.Entity[]
  }

  export class SRendering extends Core.System {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D

    private layers: Layer

    constructor(world) {
      super(world)

      this.canvas = document.querySelector('canvas') as HTMLCanvasElement
      this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D

      this.layers = []
    }

    protected shouldBind(entity) {
      return entity.has(CTransform, CDrawable)
    }

    protected bind(entity) {
      super.bind(entity)
      // TODO replace original impl and order by depth
    }

    update(t, dt) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      this.boundEntities.forEach((e) => {
        const t = e.get(CTransform) as CTransform

        this.ctx.save()
        this.ctx.translate(t.globalPosition.x, t.globalPosition.y)
        // TODO orientation

        this.draw(e)

        this.ctx.restore()
      })
    }

    private draw(entity: Core.Entity) {

      const square = entity.get(CSquare) as CSquare
      if (square) {
        this.ctx.fillStyle = square.color
        this.ctx.fillRect(0, 0, square.size, square.size)
      }

      const sprite = entity.get(CSprite) as CSprite
      if (sprite)
        this.ctx.drawImage(sprite.image,
                           sprite.position.x, sprite.position.y,
                           sprite.dimensions.x, sprite.dimensions.y,
                           0, 0,
                           sprite.dimensions.x, sprite.dimensions.y)
    }
  }

}
