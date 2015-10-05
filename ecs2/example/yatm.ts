/// <reference path='../core/world.ts' />
/// <reference path='../core/entity.ts' />
/// <reference path='../core/component.ts' />

/// <reference path='../extra/rendering.ts' />
/// <reference path='../extra/square.ts' />
/// <reference path='../extra/motion.ts' />

/// <reference path='../util/assets.ts' />
import Assets = Util.Assets

document.addEventListener('DOMContentLoaded', function() {
  Assets.load(
    [
      Util.Image('munster.png', 'munster_sprite'),
      Util.Image('tileset.png', 'tileset')
    ],
    setup
  )
})

function setup() {

  // World
  const world = new Core.World()
  world.createSystem(Rendering.SRendering)
  world.createSystem(Motion.SMotion)

  // Entities
  const munster = world.createEntity()

  // TODO better the other way around
  // like: munster.add(CTransform, {options...})
  munster.add(new CTransform({
    position: [20, 100]
  }))

/*
  munster.add(Rendering.CSquare, {
    size: 16,
    color: 'green'
  })

  munster.add(Rendering.CSprite, {
    image: Assets.get('munster_sprite'),
    position: new Vec2(0, 0),
    dimensions: new Vec2(16, 16)
  })

  munster.add(Motion.CTranslation, {
    from: new Vec2(0, 0),
    to: new Vec2(100,100),
    duration: 1,
    easing: TWEEN.Easing.Linear.None
  })


  TODO generalize motion to tween
  munster.add(Motion.CTween, {
    from: {x: 0, y: 0},
    to: {x: 100, y : 150},
    duration: 3,
    onUpdate: function(tween) {
      this.entity.get(CTransform).position = new Vec2(tween.x, tween.y)
    }
  })
*/
  start(world)
}

function start(world: Core.World) {
  let lastFrameTime = performance.now()

  const loop = function(t) {
    const dt = t - lastFrameTime
    lastFrameTime = t

    world.update(t, dt)

    requestAnimationFrame(loop)
  }

  requestAnimationFrame(loop)
}
