const connection = require("../helpers/db");
const table = "users";
const tokenForgot = "token_forgot";
const exp = "working_experience";

// Worker
exports.createUserWorker = (data, cb) => {
	connection.query(
		`INSERT INTO ${table} (role_users, type_users, name, email, phone_number, password)
    VALUES(?, ?, ?, ?, ?, ?)`
		, [data.role_users="general" ,data.type_users="worker", data.name, data.email, data.phone_number, data.password], cb);
};

exports.searchUserBySkill = (cond, cb) => {
	connection.query(`
	SELECT ${table}.id, ${table}.name, ${table}.address, ${table}.images, skills.name as skills, skills.id_user
	FROM ${table}
	LEFT JOIN skills ON ${table}.id = skills.id_user
	WHERE skills.name LIKE '%${cond}%' 
	GROUP BY NAME
	`, [cond], cb);
};

exports.getUserWorkerDetail = (id, cb) => {
	connection.query(
		`SELECT ${table}.id, ${table}.images, ${table}.name, ${table}.job_desk, ${table}.address, ${table}.working_time, ${table}.description, skills.name as skills, ${table}.instagram, ${table}.github, ${table}.gitlab
    FROM ${table}
    LEFT JOIN skills ON ${table}.id = skills.id_user
    WHERE ${table}.id= ?`,
		[id], cb);
};

exports.getPortoFolioUser = (id, cb) => {
	connection.query(`
	SELECT ${table}.id as user_id, portofolios.id, portofolios.portofolio_file as portofolios
	FROM ${table}
	LEFT JOIN portofolios ON ${table}.id = portofolios.id_user
	WHERE ${table}.id= ?
	`, [id], cb);
};

exports.getExperienceUser = (id, cb) => {
	connection.query(`
	SELECT ${table}.id as user_id, ${exp}.id, ${exp}.company_name, ${exp}.position, ${exp}.years, ${exp}.description
	FROM ${table}
	LEFT JOIN ${exp} ON ${table}.id = ${exp}.id_user
	WHERE ${table}.id=?
	`, [id], cb);
};

// Recruiter
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

