module.exports = function () {
  if (!process.env.privateKey) {
    console.error('privateKey not defined')
    process.exit(1) // 0 es para salir indicando exito, cualquier otro numero error
  }
}
