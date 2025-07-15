import express from 'express';
import multer from 'multer';


const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadDir = join(__dirname, "../uploads");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, PNG, JPEG, and JPG files are allowed.'), false);
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});
router.post('/subir-imagen', upload.single('imagen'), (req, res) => {
  console.log('Archivo recibido:', req.file);
  const archivo = req.file;
  if (!archivo) {
    return res.status(400).json({ error: 'No se subió ninguna imagen' });
  }

  res.json({
    mensaje: 'Imagen recibida correctamente',
    nombre: archivo.originalname,
    tipo: archivo.mimetype,
    tamaño: archivo.size,
  });
});


export default router;
