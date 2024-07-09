import { model, Schema, Types } from 'mongoose'
import usuarioModel from './Usuario.js'
import examenModel from './Examen.js'

const respuestaSchema = new Schema({
  pregunta: String,
  respuesta: String
})

const examenRespuestasSchema = new Schema(
  {
    examen: {
      type: Types.ObjectId,
      ref: examenModel
    },
    respuestas: [respuestaSchema],
    calificacion: {
      type: Number,
      required: true
    },
    alumno: {
      type: Types.ObjectId,
      ref: usuarioModel
    }
  },
  { collection: 'examen_respuestas' }
)

// Crear el modelo
const examenRespuestasModel = model('ExamenRespuestas', examenRespuestasSchema)

export default examenRespuestasModel
