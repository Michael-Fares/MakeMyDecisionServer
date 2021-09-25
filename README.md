# MakeMyDecisionApp
A unique decision-making tool to quantitatively rank qualitative inputs

# App Summary 
In short, my app is a decision making app. The purpose of my app is to provide a streamlined platform for the user to enter an important decision they are currently in the process of making. The app helps convert the users qualitative feelings about the decision into a quantitative ranking (in the background without them having to think about the quantitative side) in order to help them make more of a logic-based decision.

# How the process works: Please see this link for a detailed overview of how the app will operate as well as basic wireframe of the UI: 

https://docs.google.com/document/d/1BDUWJ_8ijkBLtfL3oT1Jbtm-cr1M_jkVb7_71QIiuc4/edit?usp=sharing **

# Data: App data entities indicated in **BOLD**

1. **Users**
Each user can create his/her own profile on the app by entering a username and email.

2. **Decisions** 
User enters a **Decision** | (for example: Which house should I buy?)
The user can use the app to initiate and save as many decisions as he/she wants.

Relationship: **The relationship between users and decisions is one to many.**


3. **Critera**
For each **Decision**, the user is then able to enter **Criteria** that are important. The user can enter and rank as many critera as he/she wants for each decision. | (Example criteria of importance for a house purchase might be: square footage, walkability, yard, pool, school)

The user can then rank each criteria entered by degree of importance from one of the following 5 choices 
'Unimportant'
'Slightly Unimportant'
'Neutral'
'Important'
'Very Important' 

(On the front end, the above qualitative rankings will be presented to the user. However, in the back end DB, they will be translated into a quantitative ranking on a scale from 1-5 with 'Not Important at All' being a 1, and 'Very Important' being a 5.)

*Front-End value (qualitative) *  | *Back end DB value (numerical/quantitative)* 
'Very Important'                  |     5
'Important'                       |     4
'Neutral'                         |     3
'Slightly Unimportant'            |     2
'Not Important'                   |     1

The app will then sum the quantitative values of all criteria entered, and then calculate a quantitative percentage weight for each Criteria by diviing its individual value by the sum of all values. (See table 11c in the linked google doc) (This calculation will involve queries of the database, not storage in the database)

Relationship: **The relationship between decisions and criteria is one to many.**

4. **Options**  
Next, for each **Decision** the user is then able to enter the particular-real world  **Options** for that particular decision. | (Example options of house purchase may be however the user chooses to describe them meaningfully for him/her self: '1000 Wherever Lane', 'The red brick house', 'The house with the cool loft', '9999 Whatever Street')


Relationship: **Similarly the relationship between decisions and options is one to many.**

5. **Rankings** (Join table to resolve a many to many relationship among options and criteria that exist for each decision)

Finally, the user is able to give a unique ranking to each option based on each criterion he/she entered in step 3 above.

Since the app involves ranking each unique option entered in a decision based on each unique criterion entered for that decision, this means criteria and options have a many to many relatoinship. This many to many relationship is resolved by the rankings taking place via a join table called **Rankings** where the primary key ids from the options table and criteria table are stores as foreign keys. The primary key for this join table is ranking_id, so there can be a unique record for the ranking of each option based each criteria, where the number of unique records will equal the number of criteria times the number of options involved in any given decision. 



So for example, a decision with 3 options and 4 criteria will have a total of 12 unique rankings, and the **Rankings** join table for such a decision will look something like this, where the option_id and criterion_id from items 3 and 4 above respectively will be used two foreign keys in this table that form one composite primary key.

[Composite PK = option_id(FK), criterion_id,(FK)]                  Option_Rank_On_Criterion (*See below for where these 1-5 rankings come from*)
    1,1       (option 1      ranked on    criteria 1)                      4
    1,2       (option 1      ranked on    criteria 2)                      5
    1,3       (option 1      ranked on    criteria 3)                      1
    1,4       (option 1      ranked on    criteria 4)                      2
    1,1       (option 2      ranked on    criteria 1)                      3
    2,2       (option 2      ranked on    criteria 2)                      5
    2,3       (option 2      ranked on    criteria 3)                      1
    2,4       (option 2      ranked on    criteria 4)                      3
    3,1       (option 3      ranked on    criteria 1)                      4
    3,2       (option 3      ranked on    criteria 2)                      4
    3,3       (option 3      ranked on    criteria 3)                      3
    3,4       (option 3      ranked on    criteria 4)                      2

*Option_Rank_On_Criterion*
Similarly for these rankings, The front-end will involve five buttons from frowny face to smilely face the user can click on to indicate his/her unique rating for each option based on each criterion, but this will translate to a quantitative 1 to 5 scale in the database on the back end, as such:


*Front-End value (qualitative buttons with accompanying facial expressions) *  | *Back end DB value (numerical/quantitative)* 
'Excellent'                                 |                                        5
'Good'                                      |                                        4
'Average'                                   |                                        3
'Bad'                                       |                                        2
'Terrible'                                  |                                        1


# Results end screen

Based on the above process for a given decision, the app will then present the user with a scored list of the options they entered for the decision, ranked from best choice to worst choice.

The score is caluclated as a weighted average of how the user ranks each option based on each of the criteria he/she entered and the importance assigned to that criterion in step 3 above. (This calculation will involve queries of the database, not storage in the database)

See tables 20 and 21 in the google doc for examples


# ERD diagram: Please find included in this repository an ERD diagram for this app.



# Steps I followed to create a DB and connect to it 
 1. Accessed and started my first-instance on cloud.google.com
 2. Under "databases", I created a new database called "MakeMyDecisionDB"
 3. In mySql Workbench, I connected to the database with the following paramaters:
 Connection Name: MakeMyDecisionDB
 Connection Method: Standard (TCP/IP)
 Hostname: 34.69.1.11 (IP address of google virtual machine first-instance)
 Username: root
 Password: in keychain
 Default Schema: MakeMyDecisionDB


# Table initialization: please see the file initialization.sql in the repo

# seeding database with data: Please see the individual seed sql files with sample data for each table