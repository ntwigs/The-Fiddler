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
    this.padding = 50
  }

  initialize() {
    this.draggable = Draggable.create(this.fidget, {
      type: 'x, y',
      edgeResistance: 1,
      bounds: '.container',
      throwProps: true,
      onPress: this.socketSpin.bind(this),
      onDrag: this.socketMove.bind(this),
    })
    this.fidget.addEventListener('mousedown', this.socketSpin.bind(this))
    this.timeline.to(this.fidget, 2, { rotation: 360, ease: Power0.easeNone })
    TweenLite.fromTo(this.fidget, 1, { autoAlpha: 0 }, { autoAlpha: 1, delay: 1 })
  }

  setPosition({ x, y }) {
    const outX = this.getWidth()
    const outY = this.getHeight()

    if (x < outX && x > -outX) {
      this.x = x
    }
    if (y < outY && y > -outY) {
      this.y = y
    }
  }

  getWidth() {
    const halfWindow = window.outerWidth / 2
    const halftFidget = this.fidget.clientWidth / 2
    const fullArea = halfWindow - halftFidget
    return fullArea - this.padding
  }

  getHeight() {
    const halfWindow = window.outerHeight / 2
    const halftFidget = this.fidget.clientHeight / 2
    const fullArea = halfWindow - halftFidget
    return fullArea - this.padding
  }

  setSpeed(speed) {
    this.speed = speed
  }

  socketMove() {
    const { x, y } = this.draggable[0]
    this.channel.push('move', { x, y })
  }

  socketSpin() { this.channel.push('spin') }

  move() { TweenLite.to(this.fidget, 0.35, { x: this.x, y: this.y }) }

  flash() {
    this.makeFlash()
    setTimeout(this.removeFlash.bind(this), 100)
  }

  makeFlash() {
    TweenLite.to(this.fidget, 0.250, { scale: 0.1, filter: 'brightness(2)' })
  }

  removeFlash() {
    TweenLite.to(this.fidget, 0.250, { scale: 1, filter: 'brightness(1)' })
  }

  increaseSpeed() {
    TweenLite.to(this.timeline, 0, {
      timeScale: this.speed,
    })
  }
}
