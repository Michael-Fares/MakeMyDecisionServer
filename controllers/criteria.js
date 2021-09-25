const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

// get all criteria including decision text
const getAllCriteria = (req, res) => {
 
  pool.query(`SELECT Criteria.*, Decisions.decision_text AS decision
  FROM Criteria
  JOIN Decisions
  ON Criteria.decision_id = Decisions.decision_id;`, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getCriterionById = (req, res) => {
   let sql = `SELECT Decisions.decision_id, Criteria.criterion_text, Criteria.criterion_importance, Decisions.decision_text AS decision
   FROM Criteria
   JOIN Decisions
   ON Criteria.decision_id = Decisions.decision_id
   AND Criteria.criterion_id = ?;`
   sql = mysql.format(sql, [req.params.criterion_id])
   pool.query(sql, (err, rows) => {
     if (err) return handleSQLError(res, err)
     if(!rows.length) {
       res.status(404).send("No criterion found with that id")
     }
     return res.json(rows);
   })
}

// list (get) all criteria by decision id
const listCriteriaByDecisionId = (req, res) => {
  let sql = `SELECT Criteria.criterion_id, Criteria.criterion_text, Criteria.criterion_importance, Decisions.decision_text AS decision
  FROM Criteria
  JOIN Decisions
  ON Criteria.decision_id = Decisions.decision_id
  AND Decisions.decision_id = ?;`
  sql = mysql.format(sql, [req.params.decision_id])
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    if(!rows.length) {
      res.status(404).send("No decision exists with that id")
    }
    return res.json(rows);
  })
}

const createCriterionByDecisionId = (req, res) => {
  

 let sql = `INSERT INTO Criteria (decision_id, criterion_text, criterion_importance) VALUES (?,?,?);`
 sql = mysql.format(sql, [req.params.decision_id, req.body.criterion_text, req.body.criterion_importance])
 pool.query(sql, (err, rows) => {
   if (err) return handleSQLError(res, err)
   return res.json(rows);
 })

}

const updateCriterionById = (req, res) => {

  let sql = 'UPDATE Criteria SET Criteria.criterion_text = ?, Criteria.criterion_importance = ? WHERE Criteria.criterion_id = ?'
  sql = mysql.format(sql, [req.body.criterion_text, req.body.criterion_importance, req.params.criterion_id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteCriterionById = (req, res) => {

  let sql = 'DELETE FROM ?? WHERE ?? = ?'
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['Criteria', 'Criteria.criterion_id', req.params.criterion_id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} criterion with id ${req.params.criterion_id}` });
  })
}

module.exports = {
  getAllCriteria,
  getCriterionById,
  listCriteriaByDecisionId,
  createCriterionByDecisionId,
  updateCriterionById,
  deleteCriterionById
}