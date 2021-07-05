const connection = require("../helpers/db");
const table = "users";
const tokenForgot = "token_forgot";
const exp = "working_experience";

// Worker
exports.createUserWorker = (data, cb) => {
	connection.query(
		`INSERT INTO ${table} (role_users, type_users, name, email, phone_number, password)
    VALUES(?, ?, ?, ?, ?, ?)`
		, [data.role_users = "general", data.type_users = "worker", data.name, data.email, data.phone_number, data.password], cb);
};

exports.searchUserBySkill = (cond, cb) => {
	connection.query(`
	SELECT ${table}.id, ${table}.name as Name_Worker, ${table}.address, ${table}.images, skills.name as skills, skills.id_user
	FROM ${table}
	LEFT JOIN skills ON ${table}.id = skills.id_user
	WHERE skills.name LIKE '%${cond.search}%' 
	ORDER BY ${cond.order} ${cond.value} LIMIT ${cond.limit} OFFSET ${cond.offset}`, [cond.search, cond.limit, cond.offset, cond.order, cond.value], cb);
};

exports.getUserWorkerByEmail = (email, cb) => {
	connection.query(
		`SELECT id, name, email, password FROM ${table}
  WHERE email= ?`,
		[email], cb);
};

exports.getUserWorkerDetail = (id, cb) => {
	connection.query(
		`SELECT ${table}.id, ${table}.images, ${table}.name, ${table}.type_users, skills.name as skills, ${table}.job_desk, ${table}.address, ${table}.working_time,${table}.phone_number, ${table}.gender, ${table}.position, ${table}.description,${table}.company_name, ${table}.email, ${table}.instagram, ${table}.github, ${table}.gitlab 
    FROM ${table}
    LEFT JOIN skills ON ${table}.id = skills.id_user
    WHERE ${table}.id= ?`,
		[id], cb);
};

exports.getPortoFolioUser = (id, cb) => {
	connection.query(`
	SELECT ${table}.id as user_id, portofolios.id, portofolios.project_name, portofolios.type_project, portofolios.portofolio_file as portofolios
	FROM ${table}
	LEFT JOIN portofolios ON ${table}.id = portofolios.id_user
	WHERE ${table}.id= ?
	`, [id], cb);
};

exports.getExperienceUser = (id, cb) => {
	connection.query(`
	SELECT ${table}.id as user_id, ${exp}.id, ${exp}.company_name, ${exp}.position, ${exp}.month_years, ${exp}.description
	FROM ${table}
	LEFT JOIN ${exp} ON ${table}.id = ${exp}.id_user
	WHERE ${table}.id=?
	`, [id], cb);
};

exports.getAllUserWorker = ( cond, id, cb) => {
	connection.query(`SELECT ${table}.id, ${table}.name as Name_Worker, ${table}.address, ${table}.images, skills.name as skills, skills.id_user
	FROM ${table}
	LEFT JOIN skills ON ${table}.id = skills.id_user
	WHERE skills.name LIKE '%${cond.search}%' 
	ORDER BY ${cond.order} ${cond.value} LIMIT ${cond.limit} OFFSET ${cond.offset}`, [cond.search, cond.limit, cond.offset, cond.order, cond.value, id], cb );
};

exports.getUserWorkerById = (id, cb) =>{
	connection.query(`
  SELECT id, name, images, type_users, job_desk, address, company_name, description
  FROM ${table}
  WHERE id=?
  `,[id], cb);
};


exports.UpdateUserWorker = (data, cb) => {
	connection.query(` 
  UPDATE ${table} SET name=?, images=?, job_desk=?, address=?, company_name=?, description=?, updated_time=?
  WHERE id=?
  `,[data.name, data.images, data.job_desk, data.address, data.company_name, data.description, data.updated_time, data.id], cb);
};

const porto = "portofolios"
exports.postUserWorkerPortofolio = (data, cb) => {
  connection.query(`
  INSERT INTO ${porto} ( id_user, project_name, repository, type_project, portofolio_file)
  VALUES(?, ?, ?, ?, ?)
  `, [data.id_user, data.project_name, data.repository, data.type_project, data.portofolio_file], cb)
}

exports.postUserWorkerExperience= (data, cb) => {
  connection.query(`
  INSERT INTO ${exp} ( id_user, company_name, position, month_years, description)
  VALUES(?, ?, ?, ?, ?)
  `, [data.id_user, data.company_name, data.position, data.month_years, data.description], cb)
}

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

exports.getCountWorker = (cond, cb) => {
	connection.query(`Select count(${table}.id) as total_worker from ${table}
		LEFT JOIN skills ON ${table}.id = skills.id_user
		WHERE skills.name LIKE '%${cond.search}%'`, cb);
};

exports.UpdateUserRecruiter = (data, cb) => {
	connection.query(` 
  UPDATE ${table} SET images=?, company_name=?, company_field=?, address=?, description=?, email=?, instagram=?, phone_number=?, linked_in=?, updated_time=?
  WHERE id=?
  `,[data.images, data.company_name, data.company_field, data.address, data.description, data.email, data.instagram, data.phone_number, data.linked_in, data.updated_time, data.id], cb);
};

exports.getUserFromSkill = (cond, cb) => {
	connection.query(`SELECT users.id, users.name as Name_Worker, users.address, users.images FROM users WHERE users.type_users = 'worker' OR users.id in(select skills.id_user FROM skills) LIMIT ${cond.limit} OFFSET ${cond.offset}`, [cond.limit, cond.offset], cb)
};

exports.getCountUserAllWorker = (cond, cb) => {
	connection.query(`Select count(users.id) as total_worker from users
 WHERE users.type_users = 'worker' OR users.id in (select skills.id_user FROM skills)`, [cond], cb)
}