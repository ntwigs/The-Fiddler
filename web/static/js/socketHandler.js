import { Socket } from 'phoenix'

const socket = new Socket('/socket', { params: { token: window.userToken }})
socket.connect()

const channel = socket.channel('room:fidget', {})
channel.join()
  .receive('ok', () => { channel.push('initialize') })
  .receive('error', resp => console.log('Unable to join', resp))

export default channel
