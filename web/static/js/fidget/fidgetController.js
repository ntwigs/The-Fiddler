import FidgetSpinner from './FidgetSpinner'

export default channel => {
  const fidgetSpinner = new FidgetSpinner(channel)
  fidgetSpinner.initialize()

  channel.on('initialize', setSpeed.bind(this, fidgetSpinner, false))
  channel.on('spin', setSpeed.bind(this, fidgetSpinner, true))
  channel.on('update', setSpeed.bind(this, fidgetSpinner, false))
}

const setSpeed = (fidgetSpinner, shouldFlash, { body: speed }) => {
  fidgetSpinner.speed = speed
  fidgetSpinner.increaseSpeed()
  if (shouldFlash) fidgetSpinner.flash()
}
