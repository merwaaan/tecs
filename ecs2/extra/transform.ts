/// <reference path='../core/entity.ts' />
/// <reference path='../core/component.ts' />

/// <reference path='../util/vec2.ts' />
/// <reference path='../util/mat3.ts' />
import Vec2 = Util.Vec2
import Mat3 = Util.Mat3

interface CTransformOptions {
  position: Vec2 // TODO make opt
  orientation?: number
  parent?: CTransform
}

class CTransform extends Core.Component {
  private local: Mat3
  private global: Mat3

  private parent: CTransform
  private children: CTransform[]

  constructor(entity: Core.Entity, options: CTransformOptions) {
    super(entity)

    const position = options.position || new Vec2(0, 0)
    const orientation = options.orientation * Math.PI / 180 || 0

    this.local = Mat3.transform(position, orientation)
    this.global = this.local

    this.children = []

    if (options.parent)
      options.parent.addChild(this)
  }

  addChild(transform: CTransform) {
    if (this.children.indexOf(transform) > -1) {
      console.warn('The Transform is already a child')
      return
    }

    this.children.push(transform)
    transform.parent = this
    transform.recompute()
  }

  recompute() {
    if (this.parent)
      this.global = Mat3.times(this.parent.global, this.local)
    else
      this.global = this.local

    this.children.forEach((transform) => transform.recompute())
  }

  get localPosition(): Vec2 {
    return this.local.translation
  }

  set localPosition(p: Vec2) {
    this.local.translation = p
    this.children.forEach((transform) => transform.recompute())
  }

  get localOrientation(): number {
    return this.local.rotation * 180 / Math.PI
  }

  set localOrientation(a: number) {
    this.local.rotation = a * Math.PI / 180
    this.children.forEach((transform) => transform.recompute())
  }

  get globalPosition(): Vec2 {
    return this.global.translation
  }

  get globalOrientation(): number {
    return this.global.rotation * 180 / Math.PI
  }

  get canvasTransform(): number[] {
    return [this.global.m[0][0], this.global.m[1][0],
            this.global.m[0][1], this.global.m[1][1],
            this.global.m[0][2], this.global.m[1][2]]
  }
}
