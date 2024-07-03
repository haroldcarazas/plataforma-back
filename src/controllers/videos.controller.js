import usuarioModel from '../models/Usuario.js'
import videoModel from '../models/Video.js'
import { Types } from 'mongoose'

export const index = async (req, res) => {
  try {
    const videos = await videoModel.find().populate('usuario').select('-__v')
    res.json(videos)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const getById = async (req, res) => {
  try {
    const { id } = req.params
    if (!Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'ID inválido' })

    const video = await videoModel.findOne({ _id: id }).populate('usuario').select('-__v')
    if (!video) return res.status(404).json({ message: 'Video no encontrado' })

    res.json(video)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const store = async (req, res) => {
  try {
    const { titulo, usuario, video } = req.body
    if (!titulo || !usuario || !video) return res.status(400).json({ message: 'Datos incompletos' })

    // Validar el ID
    if (!Types.ObjectId.isValid(usuario)) return res.status(400).json({ message: 'ID inválido' })

    // Validar que exista el usuario
    const usuarioDb = await usuarioModel.findOne({ _id: usuario })
    if (!usuarioDb) return res.status(404).json({ message: 'Usuario no encontrado' })

    // Crear el registro del video
    const videoNuevo = await videoModel.create({
      titulo, usuario, video
    })

    if (videoNuevo) {
      return res.status(201).json({ message: 'Video creado', data: videoNuevo })
    }

    res.status(500).json({ message: 'No se pudo crear el video' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const remove = async (req, res) => {
  try {
    const { id } = req.params
    if (!Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'ID inválido' })

    const video = await videoModel.findOneAndDelete({ _id: id })
    if (!video) return res.status(404).json({ message: 'Video no encontrado' })

    res.json({ message: 'Video eliminado', data: video })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}
