const express = require('express');
const multer = require('multer');
const app = express();
const port = 3000;
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.get('/', (req, res) => {
    res.send('Node js api');
});

const port = process.env.port || 80;
app.listen(port, () => console.log(`escuchando en puerto ${port}...`));

