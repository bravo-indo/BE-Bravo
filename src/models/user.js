const connection = require("../helpers/db");
const table = "users";

exports.createUserWorker = (data, cb) => {
	connection.query(
		`INSERT INTO ${table} (name, email, phone_number, password)
    VALUES(?, ?, ?, ?)`
		, [data.name, data.email, data.phone_number, data.password], cb);
};

exports.getUserWorkerByEmail = (email, cb) => {
	connection.query(
		`SELECT id, name, email, password FROM ${table}
  WHERE email= ?`,
		[email], cb);
};

exports.searchUserBySkill= (cond, cb) =>{
	connection.query(`
  SELECT ${table}.id, ${table}.name, ${table}.address, ${table}.images, skills.name as skills, skills.id_user
  FROM ${table}
  LEFT JOIN skills ON ${table}.id = skills.id_user
  WHERE skills.name LIKE '%${cond}%' 
  GROUP BY NAME
  `,[cond], cb);
};

exports.getUserWorkerDetail= (id, cb) => {
	connection.query(
		`SELECT ${table}.id, ${table}.images, ${table}.name, ${table}.job_desk, ${table}.address, ${table}.working_time, ${table}.description, skills.name as skills, ${table}.instagram, ${table}.github, ${table}.gitlab
    FROM ${table}
    LEFT JOIN skills ON ${table}.id = skills.id_user
    WHERE ${table}.id= ?`,
		[id], cb);
};
  
exports.getPortoFolioUser= (id, cb) => {
	connection.query(`
  SELECT ${table}.id as user_id, portofolios.id, portofolios.portofolio_file as portofolios
  FROM ${table}
  LEFT JOIN portofolios ON ${table}.id = portofolios.id_user
  WHERE ${table}.id= ?
  `, [id], cb);
};

const exp = "working_experience";
exports.getExperienceUser = (id, cb) => {
	connection.query(`
  SELECT ${table}.id as user_id, ${exp}.id, ${exp}.company_name, ${exp}.position, ${exp}.years, ${exp}.description
  FROM ${table}
  LEFT JOIN ${exp} ON ${table}.id = ${exp}.id_user
  WHERE ${table}.id=?
  `,[id], cb);
};