const { Pool } = require('pg');

// Configuración de la conexión a la base de datos
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'repertorio',
    password: 'josepedro2023',
    port: 5432
});

// Funcion para insertar registros en la tabla 
async function agregar (titulo, artista, tono) {
    console.log("Valores recibidos: " , titulo, artista, tono);
    const result = await pool.query({ 
        text: 'INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3) RETURNING *',
        values: [titulo, artista, tono]
    })
    console.log("Registro agregado: " , result.rows[0]);
    //Respuesta de la funcion
    return result.rows[0];
    // return "Registro agregado con exito"
};

async function todos () {
    const result = await pool.query("SELECT * FROM canciones");
    return result.rows;
}

//funcion para editar un registro
async function editar (id, titulo, artista, tono) {
    
    try {

        const queryEditar = {
            text: "UPDATE canciones SET titulo = $1, artista = $2, tono = $3 WHERE id = $4 RETURNING *",
            values: [titulo, artista, tono, id]
        }
        const result = await pool.query(queryEditar);
        return "Canción editada correctamente";
    }

    catch (error) {
        console.log(error);
        return error;
    }
}

//funcion para eliminar un registro según su nombre recibido como un query.string
async function eliminar (id) {
    const result = await pool.query("DELETE FROM canciones WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
}




module.exports = {agregar, todos, editar, eliminar};