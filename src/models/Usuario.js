import { Schema, model } from 'mongoose'

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  apellidos: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    required: true
  }
})

const usuarioModel = model('Usuario', usuarioSchema)

export default usuarioModel
