class FidgetSpinner {
  constructor (channel) {
    this.fidget = document.querySelector('.fidget-spinner')
    this.channel = channel
    this.speed = 10
  }

  initialize () {
    this.fidget.addEventListener('mousedown', this.socketSpin.bind(this))
  }

  socketSpin (event) { this.channel.push('spin', { body: 'spinner' }) }

  increaseSpeed (speed) {
    this.speed = this.speed -= speed / 10
    this.fidget.style.animationDuration = `${ this.speed }s`
  }
}

export default channel => {
  const fidgetSpinner = new FidgetSpinner(channel)
  fidgetSpinner.initialize()

  channel.on('spin', ({ body: speed }) => {
    fidgetSpinner.increaseSpeed(speed)
  })
}