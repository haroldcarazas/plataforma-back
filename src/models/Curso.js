import { Schema, model, Types } from 'mongoose'
import usuarioModel from './Usuario.js'

const cursoSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  maestro: {
    type: Types.ObjectId,
    ref: usuarioModel,
    required: true
  },
  alumnos: [{
    type: Types.ObjectId,
    ref: usuarioModel
  }]
})

const cursoModel = model('Curso', cursoSchema)

export default cursoModel
