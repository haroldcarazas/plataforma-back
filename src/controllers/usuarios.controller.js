import usuarioModel from '../models/Usuario.js'

export const index = async (req, res) => {
  try {
    const usuarios = await usuarioModel.find()
    res.json(usuarios)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}
