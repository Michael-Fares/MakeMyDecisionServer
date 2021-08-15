const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

// get all users including decision count - working
const getAllUsers = (req, res) => {
  // SELECT ALL USERS
  pool.query(`SELECT Users.user_id, Users.first_name, Users.last_name, Users.email, COUNT(Decisions.decision_id) AS decision_count
  FROM
  Users
  LEFT JOIN
  Decisions
  ON
  Decisions.user_id = Users.user_id
  GROUP BY
  Users.user_id;`, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

// get single user by id including decision count - working
const getUserById = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  let sql = `SELECT Users.user_id, Users.first_name, Users.last_name, Users.email, COUNT(Decisions.decision_id) AS decision_count
  FROM
  Users
  JOIN
  Decisions
  ON
  Decisions.user_id = Users.user_id AND Users.user_id = ?`
  sql = mysql.format(sql, [req.params.id])
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

// create new user - working
const createUser = (req, res) => {
  const { first_name, last_name, email } = req.body
  let sql = "INSERT INTO Users (first_name, last_name, email) VALUES (?, ?, ?);"
  sql = mysql.format(sql, [ first_name, last_name, email ])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ ...req.body });
  })
}

// update feilds for user by id - working
const updateUserById = (req, res) => {
  const { first_name, last_name, email } = req.body
  let sql = 'UPDATE Users SET first_name = ?, last_name = ?, email = ? WHERE Users.user_id = ?'
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [first_name, last_name, email, req.params.id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

// delete user by id
const deleteUserById = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  let sql = 'DELETE FROM ?? WHERE ?? = ?'
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['Users', 'Users.user_id', req.params.id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById
}