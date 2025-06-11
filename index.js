const express = require('express');
const multer = require('multer');
const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.get('/', (req, res) => {
    res.send('Node js api');
});

app.post("/subir-imagen", upload.single("imagen"), (req, res) => {
  const archivo = req.file;
  if (!archivo) {
    return res.status(400).json({ error: "No se subió ninguna imagen" });
  }
  console.log("Recibido:", archivo.originalname);

  res.json({
    mensaje: "Imagen recibida correctamente",
    nombre: archivo.originalname,
    tipo: archivo.mimetype,
    tamaño: archivo.size,
  });
});

const port = process.env.port || 80;
app.listen(port, () => console.log(`escuchando en puerto ${port}...`));

