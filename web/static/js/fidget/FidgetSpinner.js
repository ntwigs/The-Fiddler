import { TimelineMax, TweenLite, Power0 } from 'gsap'
import Draggable from 'gsap/Draggable'

export default class {
  constructor(channel) {
    this.timeline = new TimelineMax({ repeat: -1, repeatDelay: 0 })
    this.fidget = document.querySelector('.fidget-spinner')
    this.channel = channel
    this.speed = 0
    this.x = 0
    this.y = 0
  }

  initialize() {
    Draggable.create(this.fidget, { 
      type: 'x,y',
      edgeResistance: 0.65,
      bounds: '.container',
      throwProps: true,
      onPress: this.socketSpin.bind(this),
      onDrag: this.socketMove.bind(this)
    })
    this.fidget.addEventListener('mousedown', this.socketSpin.bind(this))
    this.timeline.to(this.fidget, 2, { rotation: 360, ease: Power0.easeNone })
  }


  socketMove({ layerX: x, layerY: y }) { this.channel.push('move', { x, y }) }

  socketSpin() { this.channel.push('spin') }

  flash() {
    TweenLite.to(this.fidget, 0.250, { scale: 0.1, filter: 'brightness(2)' })
    setTimeout(() => TweenLite.to(this.fidget, 0.250, { scale: 1, filter: 'brightness(1)' }), 100)
  }

  increaseSpeed() {
    TweenLite.to(this.timeline, 0, {
      timeScale: this.speed
    })
  }

  repeat() {
    this.timeline.play(lastTweenStartTime)
  }
}