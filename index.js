const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Función auxiliar para ejecutar middleware en Vercel
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido' });
    return;
  }

  try {
    await runMiddleware(req, res, upload.single('imagen'));
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al procesar la imagen' });
  }
};
