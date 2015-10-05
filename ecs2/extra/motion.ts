/// <reference path='../core/entity.ts' />
/// <reference path='../core/component.ts' />

/// <reference path='../lib/tween.js.d.ts' />

module Motion {

  interface EasingFunction {
    (k: number): number
  }

  interface CMotionOptions {
    duration: number,
    repetitions?: number,
    yoyo?: boolean,
    easing?: EasingFunction
  }

  class CMotion extends Core.Component {
    private duration: number
    private repetitions: number
    private yoyo: boolean
    private easing: EasingFunction

    tween: TWEEN.Tween
    current: any // TODO type

    constructor(entity, options: CMotionOptions) {
      super(entity)

      this.duration = options.duration * 1000
      this.repetitions = options.repetitions - 1 || 0
      this.yoyo = options.yoyo || false
      this.easing = options.easing || TWEEN.Easing.Linear.None
    }

    protected fromTo(from: any, to: any): TWEEN.Tween {
      const that = this // Ugh...
      return new TWEEN.Tween(from)
        .to(to, this.duration)
        .repeat(this.repetitions)
        .yoyo(this.yoyo)
        .easing(this.easing)
        .onUpdate(function() {
          that.current = this
        })
        .start()
        // TODO remove component when over?
    }
  }

  interface CTranslationOptions extends CMotionOptions {
    from: Vec2,
    to: Vec2
  }

  export class CTranslation extends CMotion {
    constructor(entity, options: CTranslationOptions) {
      super(entity, options)

      this.tween = this.fromTo(
        {x: options.from.x, y: options.from.y},
        {x: options.to.x, y: options.to.y})
    }
  }

  interface CRotationOptions extends CMotionOptions {
    from: number,
    to: number
  }

  export class CRotation extends CMotion {
    constructor(entity, options: CRotationOptions) {
      super(entity, options)

      this.tween = this.fromTo(
        {r: options.from},
        {r: options.to})
    }
  }

  export class SMotion extends Core.System {

    protected shouldBind(entity) {
      return entity.has(CTransform, CMotion)
    }

    update(t, dt) {
      this.boundEntities.forEach((e) => {
        const transform = e.get(CTransform) as CTransform

        const motion = e.get(CMotion) as CMotion
        motion.tween.update(t)

        // TODO sometimes current is undefined
        //console.log(motion.current)

        // What if it has several of them??
        if (motion instanceof CTranslation)
          transform.localPosition = new Vec2(motion.current.x, motion.current.y)
        else if (motion instanceof CRotation)
          transform.localOrientation = motion.current.r
      })
    }
  }

}
