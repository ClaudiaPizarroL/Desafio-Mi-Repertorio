const express = require('express');
const app = express();
const morgan = require('morgan');
const port = 3000;

//uso de morgan

app.use(morgan('dev'));

// levantar servidor en el puerto 3000
app.listen(port, () => {
    console.log(`Servidor iniciado en puerto 3000`);
  });
  
  //Importando funcion desde el modulo consultas.js
const { agregar, todos, editar, eliminar } = require('./consultas/consultas.js');

//middleware para recibir desde el front como json
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

// Ruta POST para insertar una nueva canción
app.post('/cancion', async (req, res) => {
  try {
    const { titulo, artista, tono } = req.body;
    console.log("Valores recibidos: " , titulo, artista, tono);
    await agregar (titulo, artista, tono);

    res.status(201).send('Canción insertada correctamente');
  } catch (error) {
    console.error('Error al insertar la canción:', error);
    res.status(500).send('Error al insertar la canción');
  }
});

// Ruta GET para obtener todas las canciones
app.get('/canciones', async (req, res) => {
  try {
    const data = await todos()
    res.json(data);
  } catch (error) {
    console.error('Error al obtener las canciones:', error);
    res.status(500).send('Error al obtener las canciones');
  }
});

// Ruta PUT para editar una canción
app.put('/cancion/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, artista, tono } = req.body;
    
    const result = await editar(id, titulo, artista, tono);

    res.send(result);
  } catch (error) {
    console.error('Error al actualizar la canción:', error);
    res.status(500).send('Error al actualizar la canción');
  }
});

// Ruta DELETE para eliminar una canción
app.delete('/cancion', async (req, res) => {
  try {
    const { id } = req.query;
    console.log("Canción eliminada: " , id);
    await eliminar (id);
    res.send("Canción eliminada correctamente");
  } catch (error) {
    console.error('Error al eliminar la canción:', error);
    res.status(500).send('Error al eliminar la canción');
  }
});
