from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse

app = FastAPI()

@app.get("/ping")
def ping():
    return {"status": "ok"}

@app.post("/cargar-imagen/")
async def cargar_imagen(file: UploadFile = File(...)):
    # Leemos el contenido de la imagen (pero no hacemos nada todavía)
    contenido = await file.read()
    
    # Podrías guardar la imagen o procesarla más adelante

    return JSONResponse(content={
        "nombre_archivo": file.filename,
        "tipo": file.content_type,
        "mensaje": "Imagen recibida correctamente"
    })
