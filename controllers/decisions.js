const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

/***** GET */
// get all decisions including decision count - working
const getAllDecisions = (req, res) => {
 
  pool.query(`SELECT Decisions.decision_id, Decisions.decision_text, COUNT(DISTINCT Options.option_id) AS option_count, COUNT(DISTINCT Criteria.criterion_id) AS criteria_count, Decisions.user_id
  FROM
  Decisions
  LEFT JOIN
  Options ON Decisions.decision_id = Options.decision_id
  LEFT JOIN Criteria ON Criteria.decision_id = Decisions.decision_id
  GROUP BY
  Decisions.decision_id;`, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getDecisionById = (req, res) => {
 
  let sql = `SELECT Decisions.user_id, Decisions.decision_text, COUNT(DISTINCT Options.option_id) AS option_count, COUNT(DISTINCT Criteria.criterion_id) AS criteria_count 
  FROM
  Decisions
  LEFT JOIN
  Options ON Decisions.decision_id = Options.decision_id
  LEFT JOIN Criteria ON Criteria.decision_id = Decisions.decision_id
  WHERE Decisions.decision_id = ?
  GROUP BY Decisions.decision_id;`
  sql = mysql.format(sql, [req.params.decision_id])
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

// list (get) all decisions for a user by their id - working
const listDecisionsByUserId = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  let sql = `SELECT Decisions.decision_id, Decisions.decision_text, COUNT(DISTINCT Options.option_id) AS option_count, COUNT(DISTINCT Criteria.criterion_id) AS criteria_count 
  FROM
  Decisions
  LEFT JOIN
  Options ON Decisions.decision_id = Options.decision_id
  LEFT JOIN Criteria ON Criteria.decision_id = Decisions.decision_id
  WHERE Decisions.user_id = ?
  GROUP BY Decisions.decision_id;`
  sql = mysql.format(sql, [req.params.user_id])
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createDecisionByUserId = (req, res) => {
  

  console.log("value of req.id", req.id)
  
  let sql = `INSERT INTO Decisions (user_id, decision_text) VALUES 
  (?, ?);`
  sql = mysql.format(sql, [req.id, req.body.decision_text])

  pool.query(sql, (err, rows) => {
    if (err) {
      return handleSQLError(res, err)
    }
    if (rows.user_id !== req.id) {
      res.status(400).send('Please log in')
    }
    return res.json(rows);
  })
}

const updateDecisionById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let sql = 'UPDATE Decisions SET Decision_text = ? WHERE Decisions.decision_id = ?'
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [req.body.decision_text, req.params.decision_id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteDecisionById = (req, res) => {
 // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS user_id>
 let sql = 'DELETE FROM ?? WHERE ?? = ?'
 // WHAT GOES IN THE BRACKETS
 sql = mysql.format(sql, ['Decisions', 'Decisions.decision_id', req.params.decision_id])

 pool.query(sql, (err, results) => {
   if (err) return handleSQLError(res, err)
   return res.json({ message: `Deleted ${results.affectedRows} decision(s) with id ${req.params.decision_id}` });
 })
}

module.exports = {
  getAllDecisions,
  getDecisionById,
  listDecisionsByUserId,
  createDecisionByUserId,
  updateDecisionById,
  deleteDecisionById
}