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
    const newSpeed = this.speed -= speed / 10
    if (newSpeed > 0.1) {
      this.speed = newSpeed
      this.fidget.style.animationDuration = `${ this.speed }s`
    }
  }
}

export default channel => {
  const fidgetSpinner = new FidgetSpinner(channel)
  fidgetSpinner.initialize()

  channel.on('initialize', () => {
    console.log('Initial value')
  })

  channel.on('spin', ({ body: speed }) => {
    fidgetSpinner.increaseSpeed(speed)
  })
}