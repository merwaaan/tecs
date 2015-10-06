
module Util {

  export class Mat3 {
    m: number[][]

    constructor(contents: number[][]) {
      this.m = contents
    }

    get translation(): Vec2 {
      return new Vec2(this.m[0][2], this.m[1][2])
    }

    set translation(p: Vec2) {
      this.m[0][2] = p.x
      this.m[1][2] = p.y
    }

    get rotation(): number {
      return Math.atan2(this.m[1][0], this.m[0][0])
    }

    set rotation(a: number) {
      this.m[0][0] = Math.cos(a)
      this.m[0][1] = -Math.sin(a)
      this.m[1][0] = Math.sin(a)
      this.m[1][1] = Math.cos(a)
    }

    static identity(): Mat3 {
      return new Mat3([[1, 0, 0], [0, 1, 0], [0, 0, 1]])
    }

    static transform(p: Vec2, o: number) {
      return new Mat3([
        [Math.cos(o), -Math.sin(o), p.x],
        [Math.sin(o), Math.cos(o), p.y],
        [0, 0, 1]
      ])
    }

    static plus(m1: Mat3, m2: Mat3): Mat3 {
      let m = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

      for (let i = 0; i < 3; ++i)
        for (let j = 0; j < 3; ++j)
          m[i][j] = m1[i][j] + m2[i][j]

      return new Mat3(m)
    }

    static times(m1: Mat3, m2: Mat3): Mat3 {
      let m = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

      for (let i = 0; i < 3; ++i)
        for (let j = 0; j < 3; ++j)
          m[i][j] = m1[i][0] * m2[0][j] +
                    m1[i][1] * m2[1][j] +
                    m1[i][2] * m2[2][j]

      return new Mat3(m)
    }

  }

}