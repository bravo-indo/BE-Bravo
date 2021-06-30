const connection = require("../helpers/db");
const table = "users";

exports.createUserWorker = (data, cb) => {
	connection.query(
		`INSERT INTO ${table} (name, email, phone_number, password)
    VALUES(?, ?, ?, ?)`
		, [data.name, data.email, data.phone_number, data.password], cb);
};

exports.createUserRecruiter = (data, cb) => {
	connection.query(
		`INSERT INTO ${table} (name, email, phone_number, password)
    VALUES(?, ?, ?, ?)`, [data.name, data.email, data.phone_number, data.password], cb);
};

exports.getUserByEmail = (email, cb) => {
	connection.query(`Select id, email, password from ${table} where email = ?`, email, cb);
};