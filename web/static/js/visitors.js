import { Presence } from 'phoenix'

export default (channel) => {
  let presences = {}

  const changeText = (fiddlerText) => {
    document.querySelector('title').textContent = fiddlerText
    document.querySelector('h1').textContent = fiddlerText
  }

  const setUsers = ({ user }) => {
    const amount = user.metas.length
    amount === 1 ?
      changeText('THE FIDDLER') :
      changeText(`${ amount } FIDDLERS`)
  }

  channel.on('presence_state', (state) => {
    presences = Presence.syncState(presences, state)
    setUsers(presences)
  })

  channel.on('presence_diff', (state) => {
    presences = Presence.syncDiff(presences, state)
    setUsers(presences)
  })
}
