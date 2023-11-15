const { pilotValidation } = require('../models/pilot')
const pilotController = require('../controllers/pilots')
const mongoIdFromParamValidation = require('../middlewares/mongoIdFromParams')
const validate = require('../middlewares/validate')

const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')

const { Router } = require('express')

const router = Router()

const { query } = require('express-validator')

router.get(
  '/',
  auth,
  query('search').isIn(['name']).optional(),
  query('order').isIn(['name', 'wins', 'debut_date']).optional(),
  pilotController.getAll
)
router.get(
  '/:pilotId',
  auth,
  pilotValidation,
  validate,
  pilotController.getById
)
router.post('/', pilotValidation, validate, pilotController.create)
router.put(
  '/:pilotId',
  auth,
  admin,
  mongoIdFromParamValidation('pilotId'),
  pilotValidation,
  validate,
  pilotController.update
)
router.delete(
  '/:pilotId',
  auth,
  admin,
  mongoIdFromParamValidation('pilotId'),
  validate,
  pilotController.remove
)

module.exports = router
