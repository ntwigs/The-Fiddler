import { TimelineMax, TweenLite, Power0 } from 'gsap'

export default class {
  constructor (channel) {
    this.timeline = new TimelineMax({ repeat: -1, repeatDelay: 0 })
    this.fidget = document.querySelector('.fidget-spinner')
    this.channel = channel
    this.speed = 0
    this.position = 0
  }

  initialize () {
    this.fidget.addEventListener('mousedown', this.socketSpin.bind(this))
    this.timeline.to(this.fidget, 2, { rotation: 360, ease: Power0.easeNone })
  }

  socketSpin (event) { this.channel.push('spin', { body: 'spinner' }) }

  increaseSpeed () {
    TweenLite.to(this.timeline, 0, {
      timeScale: this.speed
    })
  }

  repeat() {
    this.timeline.play(lastTweenStartTime)
  }
}