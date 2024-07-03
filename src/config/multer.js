import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const newName = Date.now() + '-' + file.originalname
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
