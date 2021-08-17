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


 // // use results.insertId property to take the newly generated criterion id, and immediately insert it into the rankings table as a foreign key - is there a way to do this for criteria and also the same for options or am I overthiking it?
 // let criteriaSql = `INSERT INTO Criteria (decision_id, criterion_text, criterion_importance) VALUES (?,?,?);`

  // criteriaSql = mysql.format(criteriaSql, [req.params.id, req.body.criterion_text, req.body.criterion_importance])

  // let rankingsSql = `INSERT INTO Rankings (criterion_id) VALUES (SELECT LAST_INSERT_ID())`
  
  
  // // rankingsSql = mysql.format(rankingsSql, LAST_INSERT_ID())

  // pool.query(criteriaSql, (err, results) => {
  //   pool.query(rankingsSql, (err, results) => {
  //     if (err) return handleSQLError(res, err)
  //     return res.json(rows)
  //   })
  // })

}

const updateCriterionById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let sql = 'UPDATE ?? SET ?? = ?, ?? = ? WHERE id = ?'
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['users', 'first_name', req.body.first_name, 'last_name', req.body.last_name, req.params.id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteCriterionById = (req, res) => {
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
  getAllCriteria,
  getCriterionById,
  listCriteriaByDecisionId,
  createCriterionByDecisionId,
  updateCriterionById,
  deleteCriterionById
}