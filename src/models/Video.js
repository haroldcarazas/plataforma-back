import { Schema, model, Types } from 'mongoose'
import usuarioModel from './Usuario.js'

const videoSchema = new Schema({
  video: {
    type: String,
    required: true
  },
  titulo: {
    type: String,
    required: true
  },
  usuario: {
    type: Types.ObjectId,
    ref: usuarioModel,
    required: true
  }
})

const videoModel = model('Video', videoSchema)

export default videoModel
