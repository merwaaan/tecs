/// <reference path='../core/entity.ts' />
/// <reference path='../core/component.ts' />

module Rendering {

  export interface CDrawableOptions {
    depth?: number
  }

  export class CDrawable extends Core.Component {
    depth: number

    constructor(entity: Core.Entity, options: CDrawableOptions) {
      super(entity)

      this.depth = options.depth || 0
    }
  }

}
