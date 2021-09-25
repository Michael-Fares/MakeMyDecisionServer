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
    if(!rows.length) {
      res.status(404).send("No option found with that id")
    }
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
    if(!rows.length) {
      res.status(404).send("No decision exists with that id")
    }
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
  let sql = 'UPDATE Options SET Options.option_text = ? WHERE Options.option_id = ?'
  sql = mysql.format(sql, [req.body.option_text, req.params.option_id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteOptionById = (req, res) => {
  let sql = 'DELETE FROM ?? WHERE ?? = ?'
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['Options', 'Options.option_id', req.params.option_id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} option with id ${req.params.option_id}` });
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