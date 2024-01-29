INSERT INTO tb_user (name, email, password, role) VALUES ('Alex', 'alex@gmail.com', '$2a$10$fD8b0AtMOrIaepBCqfBcN.2aFAeXNNAxa1lEdPRWNmnGCJLH8ccH6', 'ADMIN');
INSERT INTO tb_user (name, email, password, role) VALUES ('John', 'john@example.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'USER');
INSERT INTO tb_user (name, email, password, role) VALUES ('Alice', 'alice@example.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'USER');
INSERT INTO tb_user (name, email, password, role) VALUES ('Bob', 'bob@example.com', '$2a$10$K1BzgR3h5ERfzE5nTz8jaO0fsXJc5.ZIpa3hrGhJgBk5T1KAGcZFG', 'USER');
INSERT INTO tb_user (name, email, password, role) VALUES ('Carlos', 'carlos@example.com', '$2a$10$FhPmdM4pS1Q9jYthJyV0meu5o.7Kj8ZWSFZxW2D2G6KgFjmT3CmZC', 'USER');
INSERT INTO tb_user (name, email, password, role) VALUES ('Diana', 'diana@example.com', '$2a$10$l9HnHq1mZzEJi6gEdYdB1uQkPjgxC2gtCjC8jzKf5g1KjTFYf9qAi', 'USER');


INSERT INTO tb_event (event_name, start_date, end_date, user_id) VALUES ('Evento 1', '2024-01-25 10:00:00', '2024-01-25 12:00:00', 1);
INSERT INTO tb_event (event_name, start_date, end_date, user_id) VALUES ('Evento 2', '2024-01-26 14:00:00', '2024-01-26 16:00:00', 1);
INSERT INTO tb_event (event_name, start_date, end_date, user_id) VALUES ('Evento 3', '2024-01-28 09:30:00', '2024-01-28 11:30:00', 1);

INSERT INTO tb_event (event_name, start_date, end_date, user_id) VALUES ('Evento 4', '2024-01-30 15:00:00', '2024-01-30 17:00:00', 2);
INSERT INTO tb_event (event_name, start_date, end_date, user_id) VALUES ('Evento 5', '2024-02-01 13:30:00', '2024-02-01 15:30:00', 2);

INSERT INTO tb_event (event_name, start_date, end_date, user_id) VALUES ('Evento 6', '2024-02-05 09:00:00', '2024-02-05 11:00:00', 3);
INSERT INTO tb_event (event_name, start_date, end_date, user_id) VALUES ('Evento 7', '2024-02-07 14:30:00', '2024-02-07 16:30:00', 3);
