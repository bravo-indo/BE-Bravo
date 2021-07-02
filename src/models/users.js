const connection = require("../helpers/db");
const table = "users";
const tokenForgot = "token_forgot";

exports.createUserWorker = (data, cb) => {
	connection.query(
		`INSERT INTO ${table} (name, email, phone_number, password)
    VALUES(?, ?, ?, ?)`
		, [data.name, data.email, data.phone_number, data.password], cb);
};

exports.createUserRecruiter = (data, cb) => {
	connection.query(
		`INSERT INTO ${table} (role_users, type_users, name, email, company_name, position, phone_number, password)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?)`, [data.role_users="general" ,data.type_users="recruiter", data.name, data.email, data.company_name, data.position, data.phone_number, data.password], cb);
};

exports.getUserByEmail = (email, cb) => {
	connection.query(`Select id, email, password from ${table} where email = ?`, email, cb);
};

exports.checkEmailForgot = (id, email, cb) => {
	connection.query(`select id, email from ${table} where email =  ?`, id, email, cb);
};

exports.resetPassword = (email, password, cb) => {
	connection.query(`UPDATE ${table} SET password = ? WHERE email = ?`, [password,email], cb);
};

exports.createTokenForgot = (data, cb) => {
	connection.query(
		`INSERT INTO ${tokenForgot} (token) VALUES (?)`, [data.token], cb);
};
