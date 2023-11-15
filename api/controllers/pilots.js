const { Pilot } = require('../models/pilot')

const getAll = async (req, res) => {
  const { search, order } = req.query

  const query = {}
  let sort = {}

  if (search) query.name = { $regex: new RegExp(search, 'i') }

  if (order) sort[order] = 1

  const pilots = await Pilot.find(query).sort(sort)

  res.json(pilots)
}

const getById = async (req, res) => {
  const pilot = await Pilot.findById(req.params.pilotId)

  res.json(pilot)
}

const create = async (req, res) => {
  const newPilot = await Pilot.create(req.body)

  res.json(newPilot)
}

const update = async (req, res) => {
  const pilot = await Pilot.findByIdAndUpdate(req.params.pilotId, req.body, {
    new: true,
  })

  res.json(pilot)
}

const remove = async (req, res) => {
  const pilot = await Pilot.findByIdAndDelete(req.params.pilotId)

  res.json(pilot)
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
}
