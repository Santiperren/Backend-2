import express from 'express';
import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';

const router = express.Router();

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo inválido. Solo PNG, JPEG y JPG.'), false);
  }
};
const upload = multer({ storage, fileFilter });

router.post('/subir-imagen', upload.single('image'), async (req, res) => {
  try {
    const archivo = req.file;
    if (!archivo) {
      return res.status(400).json({ error: 'No se subió ninguna imagen' });
    }
    
    console.log('📸 Imagen recibida:', archivo.originalname);
    console.log("Headers:", req.headers);
    console.log("File received:", !!req.file);
    
    //const formData = new FormData();
   //formData.append('file', archivo.buffer, {
   //  filename: archivo.originalname,
  //    contentType: archivo.mimetype
  // });

   // const IA_URL = 'http://172.20.10.3:5002/infer';

   //     const response = await axios.post(IA_URL, formData, {
    //  headers: formData.getHeaders()
   // });

    console.log('✅ Respuesta de la IA:', response.data);

//    res.json({
 //     mensaje: 'Imagen procesada correctamente',
   //   resultadoIA: response.data
  //  });  
  const resultadoFalsoIA = {
      clase: 'simulado',
      precision: 0.99,
      mensaje: 'Este es un resultado simulado de la IA'
    };

    //esto tiene q hace q funcione porfa;
    res.json({
      mensaje: 'Imagen procesada correctamente',
      resultadoIA: resultadoFalsoIA
    });
  } catch (error) {
    console.error('❌ Error al conectar con la IA:', error.message);
    res.status(500).json({ error: 'Error al procesar la imagen con la IA' });
  }
});

export default router;
