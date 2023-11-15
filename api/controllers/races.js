const { Race } = require('../models/race')

const siteSetup = {
  auth: true,
}

const getAll = async (req, res) => {
  const { search } = req.query

  const query = {}

  if (search) query.name = { $regex: new RegExp(search, 'i') }

  const races = await Race.find(query)
    .populate({ path: 'podium.first_position', select: 'name' })
    .populate({ path: 'podium.second_position', select: 'name' })
    .populate({ path: 'podium.third_position', select: 'name' })

  const pageSetup = {
    ...siteSetup,
    title: 'Races',
  }

  res.render('list', { ...pageSetup, races })
}

const getById = async (req, res) => {
  const race = await Race.findById(req.params.raceId)
    .populate({ path: 'podium.first_position', select: 'name' })
    .populate({ path: 'podium.second_position', select: 'name' })
    .populate({ path: 'podium.third_position', select: 'name' })

  const pageSetup = {
    ...siteSetup,
    title: `Race: "${race.name}"`,
  }

  res.render('details', { ...pageSetup, race })
}

const create = async (req, res) => {
  const newRace = await Race.create(req.body)

  res.json(newRace)
}

const update = async (req, res) => {
  const race = await Race.findByIdAndUpdate(req.params.raceId, req.body, {
    new: true,
  })

  res.json(race)
}

const remove = async (req, res) => {
  const race = await Race.findByIdAndDelete(req.params.raceId)

  res.json(race)
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
}
