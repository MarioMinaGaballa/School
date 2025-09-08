const request = require('supertest');
const app = require('../app'); 
const db = require('../models/db'); 
const { v4: uuidv4 } = require('uuid'); 

let testStudent;

describe('Student API', () => {
    beforeAll(async () => {
        const studentId = uuidv4();
        const studentData = {
            first_name: 'Test',
            last_name: 'User',
            email: 'test.user@example.com'
        };
        const { rows } = await db.query(
            "INSERT INTO students (student_id, first_name, last_name, email) VALUES ($1, $2, $3, $4) RETURNING *",
            [studentId, studentData.first_name, studentData.last_name, studentData.email]
        );
        testStudent = rows[0];
    });

    afterAll(async () => {
        await db.query("DELETE FROM students WHERE email LIKE 'test.%'");
        await db.end();
    });

    
    describe('POST /api/students/createStudent', () => {
        it('should create a new student and return it', async () => {
            const newStudent = {
                first_name: 'John',
                last_name: 'Doe',
                email: 'test.john.doe@example.com'
            };
            const response = await request(app)
                .post('/api/students/createStudent')
                .send(newStudent)
                .expect('Content-Type', /json/)
                .expect(201);

            expect(response.body).toHaveProperty('student_id');
            expect(response.body.first_name).toBe(newStudent.first_name);
            expect(response.body.email).toBe(newStudent.email);
        });

        it('should return 409 if email already exists', async () => {
            const existingStudent = {
                first_name: 'Jane',
                last_name: 'Doe',
                email: 'test.user@example.com' 
            };
            await request(app)
                .post('/api/students/createStudent')
                .send(existingStudent)
                .expect(409);
        });

        it('should return 400 if first_name or last_name is missing', async () => {
            const incompleteStudent = {
                email: 'test.incomplete@example.com'
            };
            await request(app)
                .post('/api/students/createStudent')
                .send(incompleteStudent)
                .expect(400);
        });
    });

    describe('GET /api/students/', () => {
        it('should return a list of all students', async () => {
            const response = await request(app)
                .get('/api/students/')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });
    });


    describe('GET /api/students/:id', () => {
        it('should return a single student if ID is valid', async () => {
            const response = await request(app)
                .get(`/api/students/${testStudent.student_id}`)
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body.student_id).toBe(testStudent.student_id);
            expect(response.body.email).toBe(testStudent.email);
        });

        it('should return 404 if student ID does not exist', async () => {
            const nonExistentId = '00000000-0000-0000-0000-000000000000';
            await request(app)
                .get(`/api/students/${nonExistentId}`)
                .expect(404);
        });
    });

  
    describe('PUT /api/students/updateStudent/:id', () => {
        it('should update a student and return the updated data', async () => {
            const updatedData = {
                first_name: 'TestUpdated',
                email: 'test.updated.user@example.com'
            };
            const response = await request(app)
                .put(`/api/students/updateStudent/${testStudent.student_id}`)
                .send(updatedData)
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body.first_name).toBe(updatedData.first_name);
            expect(response.body.email).toBe(updatedData.email);
        });

        it('should return 404 if student ID to update does not exist', async () => {
            const nonExistentId = '00000000-0000-0000-0000-000000000000';
            await request(app)
                .put(`/api/students/updateStudent/${nonExistentId}`)
                .send({ first_name: 'Ghost' })
                .expect(404);
        });
    });


    describe('DELETE /api/students/deleteStudent/:id', () => {
        it('should delete a student and return a success message', async () => {
            const studentToDelete = {
                first_name: 'ToDelete',
                last_name: 'User',
                email: 'test.todelete@example.com'
            };
            const createResponse = await request(app).post('/api/students/createStudent').send(studentToDelete);
            const studentIdToDelete = createResponse.body.student_id;

            const response = await request(app)
                .delete(`/api/students/deleteStudent/${studentIdToDelete}`)
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body.message).toBe('Student deleted successfully');

            await request(app)
                .get(`/api/students/${studentIdToDelete}`)
                .expect(404);
        });
    });
});