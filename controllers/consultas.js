import { pool } from "../config/db.js";
const argumentos = process.argv.slice(2);
const opcion = argumentos[0];
const nombre = argumentos[1];
let rut = argumentos[2];
const curso = argumentos[3];
const nivel = argumentos[4];
const agregarMusico = async (nombre, rut, curso, nivel) => {
  try {
    const sql = {
      text: "insert into musicos (nombre,rut,curso,nivel) values ($1,$2,$3,$4)",
      values: [nombre, rut, curso, nivel],
    };
    const response = await pool.query(sql, values);
    console.log(`Musico ${response.rows} agregado a base de datos`);
  } catch (err) {
    console.log(err);
  }
};
const update = async (nombre, rut, curso, nivel) => {
  try {
    const sql = {
      text: "update musicos set nombre = $1, rut = $2, curso = $3, nivel = $4 where rut = $2",
      values: [nombre, rut, curso, nivel],
    };

    const response = await pool.query(sql, values);
    console.log("Musico actualizado", response.rows);
  } catch (err) {
    console.log(err);
  }
};
const deleteMusico = async (rut) => {
  try {
    const sql = {
      text: "delete from musicos where rut = $1",
      values: [rut]
    }
    const response = await pool.query(sql, values);
    console.log(`Musico Eliminado con rut: ${rut} eliminado`);
  } catch (err) {
    console.log(err);
  }
};
const getByRut = async (rut) => {
  try {
    const sql = {
      text: "select nombre,rut,curso,nivel from musicos where rut = $1",
      values: [rut]
    }
    const response = await pool.query(sql, values);
    console.log(`Mostrando musico con rut: ${rut} `);
    console.log(response.rows);
  } catch (err) {
    console.log(err);
  }
};
const mostrarMusicos = async () => {
  try {
    const SQLQuery = {
      rowMode: "array",
      text: "SELECT * FROM musicos",
    };
    const response = await pool.query(SQLQuery);
    console.log("Mostrando Musicos Registrados: ", response.rows);
  } catch (err) {
    console.log(err);
  }
};
switch (opcion) {
  case "add":
    agregarMusico(nombre, rut, curso, nivel);
    break;
  case "update":
    update(nombre, rut, curso, nivel);
    break;
  case "get":
    mostrarMusicos();
    break;
  case "delete":
    rut = argumentos[1];
    deleteMusico(rut);
    break;
  case "getRut":
    rut = argumentos[1];
    getByRut(rut);
    break;
}
