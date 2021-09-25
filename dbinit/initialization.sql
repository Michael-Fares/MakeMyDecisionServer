/*REMEBER to add ON DELETE CASCADE in Criteria table, Decisions table, and Options table*/

DROP TABLE IF EXISTS Rankings, Criteria, Options, Decisions, Users;

CREATE TABLE Users (
  user_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(50),
  login_pwd VARCHAR(100),
  PRIMARY KEY (user_id)
);


CREATE TABLE Decisions (
  decision_id INT NOT NULL AUTO_INCREMENT,
  user_id INT,
  decision_text VARCHAR(100),
  PRIMARY KEY (decision_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);


CREATE TABLE Options (
  option_id INT NOT NULL AUTO_INCREMENT,
  decision_id INT,
  option_text VARCHAR(100),
  PRIMARY KEY (option_id),
  FOREIGN KEY (decision_id) REFERENCES Decisions(decision_id)
);

CREATE TABLE Criteria (
  criterion_id INT NOT NULL AUTO_INCREMENT,
  decision_id INT,
  criterion_text VARCHAR(100),
  criterion_importance TINYINT,
  PRIMARY KEY (criterion_id),
  FOREIGN KEY (decision_id) REFERENCES Decisions(decision_id)
);

/* Join table where the the two foreign keys criterion_id and option_id form a composite primary key */
CREATE TABLE Rankings (
  option_id INT REFERENCES Options(option_id),
  criterion_id INT REFERENCES Criteria(criterion_id),
  option_rank_on_criterion TINYINT,
  PRIMARY KEY (option_id, criterion_id)
);

