import express from 'express';
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, PNG, JPEG, and JPG files are allowed.'), false);
    }
}; 
const upload = multer({ storage });
  


//router.post('/subir-imagen', upload.single('imagen'), (req, res) => {
 // console.log('Archivo recibido:', req.file);
  //const archivo = req.file;
 // if (!archivo) {
 //   return res.status(400).json({ error: 'No se subió ninguna imagen' });
 // }

 router.post('/subir-imagenes', upload.fields([
  { name: 'fileTransversalFile', maxCount: 1 },
  { name: 'fileLongitudinalFile', maxCount: 1 }
]), (req, res) => {
  console.log('Archivos recibidos:', req.files);

  const transversal = req.files['fileTransversalFile']?.[0];
  const longitudinal = req.files['fileLongitudinalFile']?.[0];

  if (!transversal || !longitudinal) {
    return res.status(400).json({ error: 'Faltan uno o ambos archivos' });
  }

  res.json({
    mensaje: 'Imagen recibida correctamente',
    nombre: archivo.originalname,
    tipo: archivo.mimetype,
    tamaño: archivo.size,
    resultado: "Simulación de respuesta de IA"
  });
});


export default router;
