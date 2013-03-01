# db schema
 
# --- !Ups
CREATE TABLE tasks (
  task_id bigint(20) NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  text varchar(255) NOT NULL,
  PRIMARY KEY  (task_id)
);
# --- !Downs
 
DROP TABLE if exists tasks;