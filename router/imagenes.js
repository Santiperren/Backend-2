import express from 'express';
import multer from 'multer';


const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/subir-imagen', upload.single('imagen'), (req, res) => {
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
