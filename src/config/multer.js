import multer from 'multer'
import fs from 'node:fs/promises'
import path from 'node:path'

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    try {
      const carpeta = path.resolve('./uploads')
      await fs.mkdir(carpeta, { recursive: true })
      cb(null, carpeta)
    } catch (error) {
      cb(error, null)
    }
  },
  filename: function (req, file, cb) {
    const { originalname } = file
    const nombreFormateado = originalname.trim().replace(/ /g, '').toLowerCase()
    const newName = Date.now() + '-' + nombreFormateado
    cb(null, newName)
  }
})

const videoFilter = (req, file, cb) => {
  const { mimetype } = file

  if (mimetype.includes('video')) {
    cb(null, true)
  } else {
    cb(new Error('Solo se permiten archivos de video'))
  }
}

export const uploadVideos = multer({ storage, fileFilter: videoFilter })
