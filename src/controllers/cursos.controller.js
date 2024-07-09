import cursoModel from '../models/Curso.js'
import examenModel from '../models/Examen.js'

export const index = async (req, res) => {
  const cursos = await cursoModel.find().populate('maestro').populate('alumnos')
  res.json(cursos)
}

export const getById = async (req, res) => {
  try {
    const { id } = req.params
    const curso = await cursoModel.findById(id).populate('maestro', '-password').populate('alumnos', '-password')
    const examenes = await examenModel.find({ curso: id }).select('nombre')

    const cursoConExamenes = {
      ...curso._doc,
      examenes
    }

    res.json(cursoConExamenes)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error interno' })
  }
}
