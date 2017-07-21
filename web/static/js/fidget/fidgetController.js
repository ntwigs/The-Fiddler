import { Presence } from 'phoenix'
import FidgetSpinner from './FidgetSpinner'

const setSpeed = (fidgetSpinner, shouldFlash, { speed }) => {
  fidgetSpinner.setSpeed(speed)
  fidgetSpinner.increaseSpeed()
  if (shouldFlash) fidgetSpinner.flash()
}

const setPosition = (fidgetSpinner, { position }) => {
  fidgetSpinner.setPosition(position)
  fidgetSpinner.move()
}

export default (channel) => {
  const fidgetSpinner = new FidgetSpinner(channel)
  fidgetSpinner.initialize()

  // Move section to new FIle
  let presences = {}

  const setUsers = ({ user }) => {
    const amount = user.metas.length
    console.log(amount)
  }

  channel.on('presence_state', (state) => {
    presences = Presence.syncState(presences, state)
    setUsers(presences)
  })
  channel.on('presence_diff', (state) => {
    presences = Presence.syncDiff(presences, state)
    setUsers(presences)
  })


  // Hit

  channel.on('initialize', (intialValues) => {
    setSpeed(fidgetSpinner, false, intialValues)
    setPosition(fidgetSpinner, intialValues)
  })

  channel.on('spin', setSpeed.bind(this, fidgetSpinner, true))
  channel.on('update', setSpeed.bind(this, fidgetSpinner, false))
  channel.on('move', setPosition.bind(this, fidgetSpinner))
}
