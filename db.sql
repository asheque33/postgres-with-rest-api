CREATE DATABASE bookdb;

CREATE TABLE book(
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(30),
    description VARCHAR(255)
);

INSERT INTO book(id,title, description)
VALUES(
    101, Road To Mecca, A journey to come back from atheism to Islam
);

SELECT * FROM book 

SELECT * FROM book where id=405

UPDATE  book SET title="dkk",description="djeiiorieuw jrit." where id=405

DELETE FROM book where id=405
