import cursoModel from '../models/Curso.js'
import examenModel from '../models/Examen.js'
import examenRespuestasModel from '../models/ExamenRespuesta.js'

export const index = async (req, res) => {
  const examenes = await examenModel.find()
  res.json(examenes)
}

export const getById = async (req, res) => {
  try {
    const { id } = req.params
    const examen = await examenModel.findById(id).select('nombre curso').populate('curso')
    const curso = await cursoModel.findById(examen.curso._id).populate('alumnos', '-password')

    const conCalificaciones = {
      ...curso._doc,
      alumnos: []
    }

    for (const a of curso.alumnos) {
      const respuesta = await examenRespuestasModel.findOne({ alumno: a._id }).select('calificacion')
      conCalificaciones.alumnos.push({ ...a._doc, calificacion: respuesta.calificacion })
    }

    const examenConAlumnos = {
      ...examen._doc,
      curso: conCalificaciones
    }

    res.json(examenConAlumnos)
  } catch (error) {
    res.status(500).json({ message: 'Error interno' })
  }
}
