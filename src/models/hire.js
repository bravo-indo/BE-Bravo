const connection = require("../helpers/db");

const table = "hire";

exports.hireWorker = (data, cb) => {
 connection.query(`
  INSERT INTO ${table} (id_worker, id_recruiter, project, name_recruiter, email_recruiter, phone_number_recruiter, desc_hire)
  VALUES(?, ?, ?, ?, ?, ?, ?)
 `, [data.id_worker, data.id_recruiter, data.project, data.name_recruiter, data.email_recruiter, data.phone_number_recruiter, data.desc_hire], cb)
}

exports.getNotifikasiHiring = (id, cb) => {
  connection.query(`
  SELECT id, id_recruiter, project, name_recruiter, email_recruiter, phone_number_recruiter, desc_hire
  FROM ${table}
  WHERE ${table}.id_worker= ?
  `, [id], cb)
}