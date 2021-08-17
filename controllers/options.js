const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

// get all options including associated decision text
const getAllOptions = (req, res) => {
 
  pool.query(`SELECT Options.*, Decisions.decision_text AS decision
  FROM Options
  JOIN Decisions
  ON Options.decision_id = Decisions.decision_id;`, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getOptionById = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  let sql = `SELECT Decisions.decision_id, Options.option_text, Decisions.decision_text AS decision
  FROM Options
  JOIN Decisions
  ON Options.decision_id = Decisions.decision_id AND Options.option_id = ?`
  sql = mysql.format(sql, [req.params.option_id])
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

// list (get) all options for a decision by decision_id
const listOptionsByDecisionId = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  let sql = `SELECT Options.option_id, Options.option_text, Decisions.decision_text AS decision
  FROM Options
  JOIN Decisions
  ON Options.decision_id = Decisions.decision_id AND Decisions.decision_id = ?`
  sql = mysql.format(sql, [req.params.decision_id])
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createOptionByDecisionId = (req, res) => {
  let sql = `INSERT INTO Options (decision_id, option_text) VALUES (?,?);`
  sql = mysql.format(sql, [req.params.decision_id, req.body.option_text])
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
 }

const updateOptionById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let sql = 'UPDATE ?? SET ?? = ?, ?? = ? WHERE id = ?'
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['users', 'first_name', req.body.first_name, 'last_name', req.body.last_name, req.params.id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteOptionById = (req, res) => {
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
  getAllOptions,
  getOptionById,
  listOptionsByDecisionId,
  createOptionByDecisionId,
  updateOptionById,
  deleteOptionById
}