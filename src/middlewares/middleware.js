import { Types } from 'mongoose'

export const validateID = (req, res, next) => {
  try {
    const { id } = req.params
    if (!Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'ID inválido' })
    next()
  } catch (error) {
    res.status(500).json({ message: 'Error al validar el ID' })
  }
}
