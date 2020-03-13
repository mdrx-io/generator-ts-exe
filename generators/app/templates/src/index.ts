import debug from 'debug'
import app from './app'

const logger = { log: debug('index') }

logger.log(app.logString)
