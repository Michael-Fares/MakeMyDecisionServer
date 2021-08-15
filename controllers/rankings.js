const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

// get all options including associated decision text
const getAllRankings = (req, res) => {
 
  pool.query(`SELECT Decisions.decision_id, Options.option_id, Criteria.criterion_id, Options.option_text AS "option", Criteria.criterion_text AS criterion,Rankings.option_rank_on_criterion
  FROM Decisions
  JOIN Options ON Decisions.decision_id = Options.decision_id
  JOIN Criteria ON Decisions.decision_id = Criteria.decision_id
  JOIN Rankings
  ON Rankings.option_id = Options.option_id AND Rankings.criterion_id = Criteria.criterion_id
  ORDER BY
  Decisions.decision_id;
  `, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

// list (get) all rankings involved in a single decision by decision_id
const listRankingsByDecisionId = (req, res) => {
  let sql = `SELECT Decisions.decision_text AS decision, Options.option_id, Criteria.criterion_id, Options.option_text AS "option", Criteria.criterion_text AS criterion, Rankings.option_rank_on_criterion
  FROM Decisions
  LEFT JOIN Options ON Decisions.decision_id = Options.decision_id
  LEFT JOIN Criteria ON Decisions.decision_id = Criteria.decision_id
  LEFT JOIN Rankings
  ON Rankings.option_id = Options.option_id AND Rankings.criterion_id = Criteria.criterion_id
  WHERE Decisions.decision_id = ?;`
  sql = mysql.format(sql, [req.params.id])
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createRanking = (req, res) => {
  let sql = `INSERT INTO Rankings (option_id, criterion_id, option_rank_on_criterion) VALUES (?,?,?);`
  sql = mysql.format(sql, [req.params.option_id, req.params.criterion_id, req.body.option_rank_on_criterion])
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const updateRankingById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let sql = 'UPDATE ?? SET ?? = ?, ?? = ? WHERE id = ?'
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['users', 'first_name', req.body.first_name, 'last_name', req.body.last_name, req.params.id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteRankingById = (req, res) => {
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
  getAllRankings,
  listRankingsByDecisionId,
  createRanking,
  updateRankingById,
  deleteRankingById
}