import 'phoenix_html'
import channel from './socketHandler'
import visitors from './visitors'
import fidget from './fidget/fidgetController'

fidget(channel)
visitors(channel)
