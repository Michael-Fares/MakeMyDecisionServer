const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const jwtSecret = "secret123";

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
  Users.user_id;`, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json(results);
  })
}

// get single user by id including decision count - working
const getUserById = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  let sql = `SELECT Users.user_id, Users.first_name, Users.last_name, Users.email, COUNT(Decisions.decision_id) AS decision_count
  FROM
  Users
  LEFT JOIN
  Decisions
  ON
  Decisions.user_id = Users.user_id 
  WHERE Users.user_id = ? AND Users.user_id IS NOT NULL
  GROUP BY
  Users.user_id`
  sql = mysql.format(sql, [req.params.user_id])
  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    if(results.length === 0) {
      return res.status(404).send('No user found with that id')
    }
    return res.json(results);
  })
}

//create a user - Signup user. 
  const createUser = (req, res) => {
  const { first_name, last_name, email, password, confirmPassword } = req.body
  
  if(password !== confirmPassword){
    return res.status(400).send("Passwords do not match");
  }

  
  let passwordHash = bcrypt.hashSync(password, 10);

  let sql = "INSERT INTO Users (first_name, last_name, email, login_pwd) VALUES (?, ?, ?, ?);"
  sql = mysql.format(sql, [ first_name, last_name, email, passwordHash ])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.send(`New user created with id ${results.insertId}`);
  })
  // calling next broke it, otherwise it works to insert a hashed password. So figure out how to fix it after.
}

// login user
const loginUser = (req, res) => {
  const { email, password } = req.body
  let sql = "SELECT user_id, email, login_pwd FROM Users WHERE email = ?;"
  sql = mysql.format(sql, [ email ])
  
  pool.query(sql, (err, results) => {
    if (err) { 
      return handleSQLError(res, err)
    }
    
    if(results.length > 1){
      console.error("Error, too many results with the same email" + email)
    };
    if(results.length == 0)(
      console.error("Did not find a row with the email " + email)
    )
    if(!err && results.length == 1){
      console.log('row password results before password hash compare: ' + results[0].login_pwd)
      
      let hash = results[0].login_pwd
      
      goodPassword = bcrypt.compareSync(password, hash)
      console.log(`this is the result of the 'good password': ` + goodPassword)
    }
    
    if(goodPassword){
      // set the jwt id equal to the user_id that has been found in the database
      const id = results[0].user_id
      const unsignedToken = {
        email: email,
        id: id
      }
      const accessToken = jwt.sign(unsignedToken, jwtSecret) //string
      res.json( { accessToken, email, id} );
    } else{
      return res.status(401).send("Email and/or Password are incorrect")
    }

  })

}


// update feilds for user by id - working
const updateUserById = (req, res) => {
  const { first_name, last_name, email } = req.body
  let sql = 'UPDATE Users SET first_name = ?, last_name = ?, email = ? WHERE Users.user_id = ?'
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [first_name, last_name, email, req.params.user_id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

// delete user by id
const deleteUserById = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS user_id>
  let sql = 'DELETE FROM ?? WHERE ?? = ?'
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['Users', 'Users.user_id', req.params.user_id])
  
   if(req.id == req.params.user_id) {
   pool.query(sql, (err, results) => {
     if (err) return handleSQLError(res, err)
     return res.json({ message: `Deleted ${results.affectedresults} user(s) with id ${req.params.user_id}` });
   })
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
  updateUserById,
  deleteUserById
}