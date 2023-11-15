const mongoose = require('mongoose')
const { body } = require('express-validator')

const pilotSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  image: { type: String },
  nationality: { type: String, required: true },
  wins: { type: Number },
  championships: { type: Number },
  podiums: { type: Number },
  debut_date: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  retirement_date: { type: Date, default: new Date('9999-12-31') },
})

const Pilot = mongoose.model('Pilot', pilotSchema)

const pilotValidation = [
  body('name').notEmpty().isString().exists(),
  body('image').isString(),
  body('nationality').notEmpty().exists(),
  body('wins').isInt(),
  body('championships').isInt(),
  body('podiums').isInt(),
  body('debut_date').notEmpty().isISO8601('yyyy-mm-dd').exists(),
  body('isActive').isBoolean().optional(),
  body('retirement_date').optional().isISO8601('yyyy-mm-dd'),
]

exports.Pilot = Pilot
exports.pilotValidation = pilotValidation
