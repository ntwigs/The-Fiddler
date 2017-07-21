import { Presence } from 'phoenix'

export default (channel) => {
  let presences = {}

  const changeText = (fiddlerText) => {
    document.querySelector('title').textContent = fiddlerText
    document.querySelector('h1').textContent = fiddlerText
  }

  const setUsers = ({ user }) => {
    const amount = user.metas.length
    const THE_FIDDLER = 'THE FIDDLER'
    const FIDDLERS = `${ amount } FIDDLERS`
    amount === 1 ?
      changeText(THE_FIDDLER) :
      changeText(FIDDLERS)
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
