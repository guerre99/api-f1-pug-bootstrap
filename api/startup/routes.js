require('express-async-errors')
const { json, static } = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const compression = require('compression')

module.exports = function (app) {
  app.use(helmet())
  app.use(compression())
  app.use(json())
  app.use(morgan('dev'))
  app.use(cors())
  app.use(static('./assets'))
  app.set('views', './views')
  app.set('view engine', 'pug')

  app.use('/api/users', require('../routes/users'))

  app.use('/api/pilots', require('../routes/pilots'))
  app.use('/api/races', require('../routes/races'))

  app.get('/ping', (req, res) => {
    res.send({ success: true })
  })

  app.use(require('../middlewares/errors'))
}
