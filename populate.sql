TRUNCATE TABLE students_subjects, teachers_subjects, students, teachers, subjects RESTART IDENTITY CASCADE;

-- Subject UUIDs
-- '1f9f2b2b-6b7a-4b0e-8b4a-1e1b1b1b1b1b' -> Mathematics
-- '2f9f2b2b-6b7a-4b0e-8b4a-2e2b2b2b2b2b' -> Physics
-- '3f9f2b2b-6b7a-4b0e-8b4a-3e3b3b3b3b3b' -> History
-- '4f9f2b2b-6b7a-4b0e-8b4a-4e4b4b4b4b4b' -> Chemistry

-- Teacher UUIDs
-- 'a1b2c3d4-e5f6-4a5b-8c9d-0a1b2c3d4e5f' -> Ahmed Ali
-- 'b1c2d3e4-f5a6-4b5c-8d9e-0b1c2d3e4f5a' -> Sara Mohamed

-- Student UUIDs
-- 'c1d2e3f4-a5b6-4c5d-8e9f-0c1d2e3f4a5b' -> Khaled Saad
-- 'd1e2f3a4-b5c6-4d5e-8f9a-0d1e2f3a4b5c' -> Mona Hassan
-- 'e1f2a3b4-c5d6-4e5f-8a9b-0e1f2a3b4c5d' -> Youssef Tarek
-- ----------------------------------------------------------------

INSERT INTO subjects (subject_id, subject_name) VALUES
('1f9f2b2b-6b7a-4b0e-8b4a-1e1b1b1b1b1b', 'Mathematics'),
('2f9f2b2b-6b7a-4b0e-8b4a-2e2b2b2b2b2b', 'Physics'),
('3f9f2b2b-6b7a-4b0e-8b4a-3e3b3b3b3b3b', 'History'),
('4f9f2b2b-6b7a-4b0e-8b4a-4e4b4b4b4b4b', 'Chemistry');

INSERT INTO teachers (teacher_id, first_name, last_name, email) VALUES
('a1b2c3d4-e5f6-4a5b-8c9d-0a1b2c3d4e5f', 'Ahmed', 'Ali', 'ahmed.ali@example.com'),
('b1c2d3e4-f5a6-4b5c-8d9e-0b1c2d3e4f5a', 'Sara', 'Mohamed', 'sara.mohamed@example.com');

INSERT INTO students (student_id, first_name, last_name, email) VALUES
('c1d2e3f4-a5b6-4c5d-8e9f-0c1d2e3f4a5b', 'Khaled', 'Saad', 'khaled.saad@example.com'),
('d1e2f3a4-b5c6-4d5e-8f9a-0d1e2f3a4b5c', 'Mona', 'Hassan', 'mona.hassan@example.com'),
('e1f2a3b4-c5d6-4e5f-8a9b-0e1f2a3b4c5d', 'Youssef', 'Tarek', 'youssef.tarek@example.com');

INSERT INTO teachers_subjects (teacher_id, subject_id) VALUES
('a1b2c3d4-e5f6-4a5b-8c9d-0a1b2c3d4e5f', '1f9f2b2b-6b7a-4b0e-8b4a-1e1b1b1b1b1b'),
('a1b2c3d4-e5f6-4a5b-8c9d-0a1b2c3d4e5f', '3f9f2b2b-6b7a-4b0e-8b4a-3e3b3b3b3b3b'), 
('b1c2d3e4-f5a6-4b5c-8d9e-0b1c2d3e4f5a', '2f9f2b2b-6b7a-4b0e-8b4a-2e2b2b2b2b2b'),
('b1c2d3e4-f5a6-4b5c-8d9e-0b1c2d3e4f5a', '4f9f2b2b-6b7a-4b0e-8b4a-4e4b4b4b4b4b');


INSERT INTO students_subjects (student_id, subject_id, teacher_id) VALUES
('c1d2e3f4-a5b6-4c5d-8e9f-0c1d2e3f4a5b', '1f9f2b2b-6b7a-4b0e-8b4a-1e1b1b1b1b1b', 'a1b2c3d4-e5f6-4a5b-8c9d-0a1b2c3d4e5f'), 
('c1d2e3f4-a5b6-4c5d-8e9f-0c1d2e3f4a5b', '2f9f2b2b-6b7a-4b0e-8b4a-2e2b2b2b2b2b', 'b1c2d3e4-f5a6-4b5c-8d9e-0b1c2d3e4f5a'), 

('d1e2f3a4-b5c6-4d5e-8f9a-0d1e2f3a4b5c', '2f9f2b2b-6b7a-4b0e-8b4a-2e2b2b2b2b2b', 'b1c2d3e4-f5a6-4b5c-8d9e-0b1c2d3e4f5a'), 
('d1e2f3a4-b5c6-4d5e-8f9a-0d1e2f3a4b5c', '3f9f2b2b-6b7a-4b0e-8b4a-3e3b3b3b3b3b', 'a1b2c3d4-e5f6-4a5b-8c9d-0a1b2c3d4e5f'), 

('e1f2a3b4-c5d6-4e5f-8a9b-0e1f2a3b4c5d', '1f9f2b2b-6b7a-4b0e-8b4a-1e1b1b1b1b1b', 'a1b2c3d4-e5f6-4a5b-8c9d-0a1b2c3d4e5f'), 
('e1f2a3b4-c5d6-4e5f-8a9b-0e1f2a3b4c5d', '4f9f2b2b-6b7a-4b0e-8b4a-4e4b4b4b4b4b', 'b1c2d3e4-f5a6-4b5c-8d9e-0b1c2d3e4f5a'); 