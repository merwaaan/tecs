
module Util {

  export class Vec2 {
    constructor(public x: number, public y: number) { }

    static plus(v1, v2) {
      return new Vec2(v1.x + v2.x, v1.y + v2.y)
    }

    static magnitude(v) {
      return Math.sqrt(v.x * v.x + v.y * v.y)
    }

    static normalized(v) {
      const m = Vec2.magnitude(v)
      return new Vec2(v.x / m, v.y / m)
    }

    static scaled(v, s) {
      return new Vec2(v.x * s, v.y * s)
    }

    static negated(v) {
      return new Vec2(-v.x, -v.y)
    }
  }

}
