const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

// get all users
const getAllUsers = (req, res) => {
  // SELECT ALL USERS
  pool.query(`SELECT * FROM Users`, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getUserById = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  let sql = 'SELECT ??, ??, ?? FROM ?? WHERE ?? = ?'
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['id', 'first_name', 'last_name', 'users', 'id', req.params.id])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createUser = (req, res) => {
  // INSERT INTO USERS FIRST AND LAST NAME 
  let usersSql = `
  INSERT INTO users 
  SET first_name = ?, last_name = ?; `

  let addressSql =`INSERT INTO usersAddress 
  SET user_id = ?, address = ?, city = ?, county = ?, state=?, zip = ?;`
  
  let contactSql = `INSERT INTO 
  usersContact 
  SET user_id = ?, phone1 = ?, phone2 = ?, email = ?; 
  `

  // WHAT GOES IN THE BRACKETS
usersSql = mysql.format(usersSql, 
    [req.body.first_name, req.body.last_name])

addressSql = mysql.format( addressSql, 
    [req.body.user_id, req.body.address, req.body.city, req.body.county, req.body.state, req.body.zip,
    ]);

contactSql = mysql.format(contactSql, 
    [req.body.user_id, req.body.phone1, req.body.phone2, req.body.email])



// your "nested pool query method worked!!! what a life saver!"

  pool.query(usersSql, (err, results) => {
    pool.query(addressSql, (err, results) => {
      pool.query(contactSql, (err, results) => {
        if (err) return handleSQLError(res, err)
        return res.json({ newId: results.insertId, 
                          ...req.body});
      })
    })  
  })
}

const updateUserById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let sql = 'UPDATE ?? SET ?? = ?, ?? = ? WHERE id = ?'
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['users', 'first_name', req.body.first_name, 'last_name', req.body.last_name, req.params.id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteUserByFirstName = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  let sql = 'DELETE FROM ?? WHERE ?? = ?'
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['users', 'first_name', req.params.first_name])

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
  deleteUserByFirstName
}