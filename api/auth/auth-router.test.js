const request = require('supertest');
const server = require('../server');
const db = require('../data/db-config');

describe('auth-router.test.js', () => {
	it('should set up testing environment', () => {
		expect(process.env.DB_ENV).toBe('testing');
	});
});

describe('auth-router', () => {
	let res = {};

	describe('POST /register/diner', () => {
		beforeAll(async () => {
			res = await request(server).post('/api/auth/register/diner').send({
				username: 'diner3',
				password: 'password',
				email: 'diner@gmail.com',
			});
		});

		it('should return a JSON object', () => {
			expect(res.type).toBe('application/json');
		});

		it('should return 201', () => {
			expect(res.status).toBe(201);
		});
	});

	describe('POST /register/operator', () => {
		beforeAll(async () => {
			res = await request(server).post('/api/auth/register/operator').send({
				username: 'operator3',
				password: 'password',
				email: 'operator@gmail.com',
			});
		});

		it('should return a JSON object', () => {
			expect(res.type).toBe('application/json');
		});

		it('should return a 201', () => {
			expect(res.status).toBe(201);
		});
	});

	describe('POST /login', () => {
		beforeAll(async () => {
			res = await request(server).post('/api/auth/login').send({
				username: 'operator3',
				password: 'password',
			});
		});

		it('should return a JSON object', () => {
			expect(res.type).toBe('application/json');
		});
	});
});
