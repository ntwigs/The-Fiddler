export default channel => {
  const fidgetSpinner = document.querySelector('.fidget-spinner')

  fidgetSpinner.addEventListener('mousedown', event => {
    channel.push('spin', { body: 'spinner' })
  })

  channel.on("spin", payload => {
    console.log(payload)
  })
}