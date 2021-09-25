/* Option Criteria Rankings for The first 3 decisions only (Decisions id's 1,2, and 3) 
For simplicity in the dummy data, each decision has 3 options and 4 criteria, with a total of 12 unique option-citeria-rankings
*/

INSERT INTO Rankings
(option_id, criterion_id, option_rank_on_criterion)
VALUES

/*Decision id #1 each of 3 options ranked on 4 criteria*/
(1,1,5),
(1,2,4),
(1,3,3),
(1,4,2),

(2,1,1),
(2,2,5),
(2,3,4),
(2,4,3),

(3,1,2),
(3,2,1),
(3,3,5),
(3,4,4),

/*Decision id #2 each of 3 options ranked on 4 criteria*/
(4,5,3),
(4,6,2),
(4,7,1),
(4,8,5),

(5,5,4),
(5,6,3),
(5,7,2),
(5,8,1),

(6,5,5),
(6,6,4),
(6,7,3),
(6,8,2),

/*Decision id #1 each of 3 options ranked on 4 criteria*/

(7,9,1),
(7,10,5),
(7,11,4),
(7,12,3),

(8,9,2),
(8,10,1),
(8,11,5),
(8,12,4),

(9,9,3),
(9,10,2),
(9,11,1),
(9,12,5);