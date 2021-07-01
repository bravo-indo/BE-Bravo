const connection = require("../helpers/db");

const table = "skills";

exports.getSkills = (cb) => {
	connection.query(`select name from ${table}`, cb);
};

exports.addSkills = (data, cb) => {
	connection.query(`insert into ${table} (name, id_user) values (?,?)`, [data.name, data.code], cb);
};