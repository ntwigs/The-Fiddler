import { Socket } from 'phoenix'
export const socket = new Socket('/socket', { params: { token: window.userToken }})
socket.connect()

export const channel = socket.channel('room:fidget', {})
channel.join()
  .receive('ok', resp => { console.log('Joined successfully', resp) })
  .receive('error', resp => { console.log('Unable to join', resp) })


