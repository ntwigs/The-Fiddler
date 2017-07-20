import FidgetSpinner from './FidgetSpinner'

export default channel => {
  const fidgetSpinner = new FidgetSpinner(channel)
  fidgetSpinner.initialize()

  channel.on('initialize', setSpeed.bind(this, fidgetSpinner, false))
  channel.on('spin', setSpeed.bind(this, fidgetSpinner, true))
  channel.on('update', setSpeed.bind(this, fidgetSpinner, false))
  channel.on('move', setPosition.bind(this, fidgetSpinner))
}

const setSpeed = (fidgetSpinner, shouldFlash, { speed }) => {
  fidgetSpinner.speed = speed
  fidgetSpinner.increaseSpeed()
  if (shouldFlash) fidgetSpinner.flash()
}

const setPosition = (fidgetSpinner, { position }) => {
  const { x, y } = position
  fidgetSpinner.x = x 
  fidgetSpinner.y = y 
  fidgetSpinner.move()
}
