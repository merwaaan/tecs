/// <reference path='rendering.ts' />

module Rendering {

  interface CSquareOptions extends CDrawableOptions {
    size: number
    color: string
  }

  export class CSquare extends CDrawable {
    size: number
    color: string

    constructor(entity: Core.Entity, options: CSquareOptions) {
      super(entity, options)

      this.size = options.size || 10
      this.color = options.color || 'red'
    }
  }

}
