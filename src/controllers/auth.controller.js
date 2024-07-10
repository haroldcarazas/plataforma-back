import usuarioModel from '../models/Usuario.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/config.js'

export const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const usuario = await usuarioModel.findOne({ username })

    if (!usuario) return res.status(404).json({ message: 'No se encontró el usuario' })
    const isValid = await bcrypt.compare(password, usuario.password)

    if (isValid) {
      const token = jwt.sign({ id: usuario._id }, SECRET_KEY, { expiresIn: '1h' })
      return res.json({ message: 'Login exitoso', token })
    }
    return res.status(400).json({ message: 'Credenciales inválidas' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const register = async (req, res) => {
  try {
    const { username, password, nombre, apellidos, rol } = req.body
    const usuario = await usuarioModel.findOne({ username })

    if (usuario) return res.status(404).json({ message: 'El usuario ya existe' })

    const hash = await bcrypt.hash(password, 10)
    await usuarioModel.create({
      nombre,
      username,
      password: hash,
      apellidos,
      rol
    })

    res.status(201).json({ message: 'Usuario creado' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const me = async (req, res) => {
  try {
    const { authorization } = req.headers
    const { id } = jwt.verify(authorization, SECRET_KEY)
    const usuario = await usuarioModel.findById(id).select('-password -__v')
    res.json(usuario)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
