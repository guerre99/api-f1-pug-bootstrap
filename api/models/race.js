const mongoose = require('mongoose')
const { body } = require('express-validator')

const raceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: Date, required: true },
  image: { type: String },
  description: { type: String },
  date: { type: Date, required: true },
  podium: {
    first_position: { type: mongoose.Schema.Types.ObjectId, ref: 'Pilot' },
    second_position: { type: mongoose.Schema.Types.ObjectId, ref: 'Pilot' },
    third_position: { type: mongoose.Schema.Types.ObjectId, ref: 'Pilot' },
  },
  resume: { type: String },
})
const Race = mongoose.model('Race', raceSchema)

// Investiga como crear un validador que comprueba que los 3 pilotos son diferentes
// BONUS: Trata con express validator de también verificar que las id pasadas corresponden con ids que tienen pilotos existentes en la db
const raceValidation = [
  body('name').notEmpty().isString().exists(),
  body('year').notEmpty().isISO8601('yyyy').exists(),
  body('image').isString(),
  body('description').isString(),
  body('date').notEmpty().isISO8601('yyyy-mm-dd').exists(),
  body('podium.first_position').notEmpty().exists(),
  body('podium.second_position').notEmpty().exists(),
  body('podium.third_position').notEmpty().exists(),
  body('podium')
    .notEmpty()
    .isObject()
    .exists()
    .custom(async (podiumData) => {
      const { first_position, second_position, third_position } = podiumData
      if (
        second_position === first_position ||
        third_position === first_position ||
        third_position === second_position
      )
        throw new Error("Can't use the same pilot for two or more positions")
    }),
  body('resume').isString(),
]

exports.Race = Race
exports.raceValidation = raceValidation
