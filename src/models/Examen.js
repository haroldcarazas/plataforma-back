import { Schema, model, Types } from 'mongoose'
import cursoModel from './Curso.js'

const preguntaSchema = new Schema({
  pregunta: {
    type: String,
    required: true
  },
  opciones: {
    type: [String],
    required: true
  },
  respuesta: {
    type: String,
    required: true
  }
})

const examenSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  preguntas: {
    type: [preguntaSchema],
    required: true
  },
  curso: {
    type: Types.ObjectId,
    ref: cursoModel,
    required: true
  }
})

const examenModel = model('Examene', examenSchema)

export default examenModel
