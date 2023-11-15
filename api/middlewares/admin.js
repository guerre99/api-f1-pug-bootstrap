module.exports = (req, res, next) => {
  const { isAdmin } = req.user

  if (!isAdmin) return res.status(403).json({ msg: 'Acceso prohibido.' })

  next()
}
