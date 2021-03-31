const request = require('supertest');
const server = require('../server');
const db = require('../data/db-config');

describe('operators-router', () => {
	let res = {};
	let operatorId = null;
	let token = '';

	beforeAll(async () => {
		const operator = await request(server).post('/api/auth/login').send({
			username: 'operator1',
			password: 'password',
		});

		token = operator.body.token;
		operatorId = operator.body.operator.operatorId;
	});

	describe('GET /api/operators', () => {
		beforeAll(async () => {
			res = await request(server)
				.get('/api/operators')
				.set('Authorization', `Bearer ${token}`);
		});

		it('should return 200', () => {
			expect(res.status).toBe(200);
		});

		it('should return a JSON object', () => {
			expect(res.type).toBe('application/json');
		});
	});

	describe('GET /api/operators/:id', () => {
		beforeAll(async () => {
			res = await request(server)
				.get(`/api/operators/${operatorId}`)
				.set('Authorization', `Bearer ${token}`);
		});

		it('should return 200', () => {
			expect(res.status).toBe(200);
		});

		it('should return a JSON object', () => {
			expect(res.type).toBe('application/json');
		});
	});

	describe('GET /api/operators/:id/trucksOwned', () => {
		beforeAll(async () => {
			res = await request(server)
				.get('/api/operators/101/trucksOwned')
				.set('Authorization', `Bearer ${token}`);
		});

		it('should return 200', () => {
			expect(res.status).toBe(200);
		});

		it('should return a JSON object', () => {
			expect(res.type).toBe('application/json');
		});
	});
});
