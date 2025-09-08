const request = require('supertest');
const app = require('../app'); // Ensure the path to your app.js is correct
const db = require('../models/db'); // Ensure the path to your db.js is correct
const { v4: uuidv4 } = require('uuid');

// We will define variables to use across our tests
let testTeacher;

describe('Teacher API', () => {
    // This runs once before all tests
    beforeAll(async () => {
        // We create a sample teacher to use for GET, PUT, and DELETE tests
        const teacherId = uuidv4();
        const teacherData = {
            first_name: 'Jane',
            last_name: 'Doe',
            email: 'test.jane.doe@example.com'
        };
        const { rows } = await db.query(
            "INSERT INTO teachers (teacher_id, first_name, last_name, email) VALUES ($1, $2, $3, $4) RETURNING *",
            [teacherId, teacherData.first_name, teacherData.last_name, teacherData.email]
        );
        testTeacher = rows[0];
    });

    // This runs once after all tests are finished
    afterAll(async () => {
        // Clean up the database by deleting all teachers created during the tests
        await db.query("DELETE FROM teachers WHERE email LIKE 'test.%'");
        // Close the database connection to allow Jest to exit cleanly
        await db.end();
    });

    /**
     * Test Suite for POST /api/teachers/createTeacher
     */
    describe('POST /api/teachers/createTeacher', () => {
        it('should create a new teacher successfully', async () => {
            const newTeacher = {
                first_name: 'John',
                last_name: 'Smith',
                email: 'test.john.smith@example.com'
            };
            const response = await request(app)
                .post('/api/teachers/createTeacher')
                .send(newTeacher)
                .expect('Content-Type', /json/)
                .expect(201);

            expect(response.body).toHaveProperty('teacher_id');
            expect(response.body.first_name).toBe(newTeacher.first_name);
        });

        it('should return 409 conflict for duplicate email', async () => {
            const duplicateTeacher = {
                first_name: 'Another',
                last_name: 'Jane',
                email: 'test.jane.doe@example.com' // Same email as in beforeAll
            };
            await request(app)
                .post('/api/teachers/createTeacher')
                .send(duplicateTeacher)
                .expect(409);
        });

        it('should return 400 bad request if first name is missing', async () => {
            const badRequestTeacher = {
                last_name: 'Alone',
                email: 'test.bad.request@example.com'
            };
            await request(app)
                .post('/api/teachers/createTeacher')
                .send(badRequestTeacher)
                .expect(400);
        });
    });

    /**
     * Test Suite for GET /api/teachers/
     */
    describe('GET /api/teachers/', () => {
        it('should return an array of all teachers', async () => {
            const response = await request(app)
                .get('/api/teachers/')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });
    });

    /**
     * Test Suite for GET /api/teachers/:id (SKIPPED)
     * This test is skipped because the endpoint is not implemented yet.
     * See the note at the top of the file to implement it.
     */
    describe('GET /api/teachers/:id', () => {
        it.skip('should return a single teacher by ID', async () => {
            const response = await request(app)
                .get(`/api/teachers/${testTeacher.teacher_id}`)
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body.teacher_id).toBe(testTeacher.teacher_id);
            expect(response.body.email).toBe(testTeacher.email);
        });

        it.skip('should return 404 not found for a non-existent teacher ID', async () => {
             const nonExistentId = '00000000-0000-0000-0000-000000000000';
             await request(app)
                .get(`/api/teachers/${nonExistentId}`)
                .expect(404);
        });
    });

    /**
     * Test Suite for PUT /api/teachers/updateTeacher/:id
     */
    describe('PUT /api/teachers/updateTeacher/:id', () => {
        it('should update a teacher successfully', async () => {
            const updatedInfo = {
                first_name: 'Janet',
                email: 'test.janet.doe.updated@example.com'
            };
            const response = await request(app)
                .put(`/api/teachers/updateTeacher/${testTeacher.teacher_id}`)
                .send(updatedInfo)
                .expect('Content-Type', /json/)
                .expect(200);

            expect(response.body.first_name).toBe(updatedInfo.first_name);
            expect(response.body.email).toBe(updatedInfo.email);
        });

        it('should return 404 not found when trying to update a non-existent teacher', async () => {
            const nonExistentId = '00000000-0000-0000-0000-000000000000';
            await request(app)
                .put(`/api/teachers/updateTeacher/${nonExistentId}`)
                .send({ first_name: 'Ghost' })
                .expect(404);
        });
    });

    /**
     * Test Suite for DELETE /api/teachers/deleteTeacher/:id
     */
    describe('DELETE /api/teachers/deleteTeacher/:id', () => {
        it('should delete a teacher successfully', async () => {
            // Create a new teacher just for this delete test to avoid conflicts
            const teacherToDelete = {
                first_name: 'Temp',
                last_name: 'Teacher',
                email: 'test.temp.teacher@example.com'
            };
            const createResponse = await request(app).post('/api/teachers/createTeacher').send(teacherToDelete);
            const teacherId = createResponse.body.teacher_id;

            // Now delete the teacher
            await request(app)
                .delete(`/api/teachers/deleteTeacher/${teacherId}`)
                .expect('Content-Type', /json/)
                .expect(200);
        });

        it('should return 404 not found when trying to delete a non-existent teacher', async () => {
             const nonExistentId = '00000000-0000-0000-0000-000000000000';
             await request(app)
                .delete(`/api/teachers/deleteTeacher/${nonExistentId}`)
                .expect(404);
        });
    });
});