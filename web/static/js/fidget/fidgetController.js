import FidgetSpinner from './FidgetSpinner'

export default channel => {
  const fidgetSpinner = new FidgetSpinner(channel)
  fidgetSpinner.initialize()
  channel.on('initialize', setSpeed.bind(this, fidgetSpinner))
  channel.on('spin', setSpeed.bind(this, fidgetSpinner))
}

const setSpeed = (fidgetSpinner, { body: speed }) => {
  fidgetSpinner.speed = speed
  fidgetSpinner.increaseSpeed()
}
