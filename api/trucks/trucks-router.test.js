const request = require('supertest');
const server = require('../server');
const db = require('../data/db-config');

describe('trucks-router', () => {
	let res = {};
	let truckId = null;
	let token = '';

	beforeAll(async () => {
		const operator = await request(server).post('/api/auth/login').send({
			username: 'operator1',
			password: 'password',
		});

		token = operator.body.token;
		operatorId = operator.body.operator.operatorId;
	});

	describe('GET /api/trucks', () => {
		beforeAll(async () => {
			res = await request(server)
				.get('/api/trucks')
				.set('Authorization', `Bearer ${token}`);
		});

		it('should return 200', () => {
			expect(res.status).toBe(200);
		});

		it('should return a JSON object', () => {
			expect(res.type).toBe('application/json');
		});
	});

	describe('GET /api/trucks/:id', () => {
		beforeAll(async () => {
			res = await request(server)
				.get('/api/trucks/100001')
				.set('Authorization', `Bearer ${token}`);
		});

		it('should return 200', () => {
			expect(res.status).toBe(200);
		});

		it('should return a JSON object', () => {
			expect(res.type).toBe('application/json');
		});
	});

	describe('POST /api/trucks', () => {
		beforeAll(async () => {
			res = await request(server)
				.post('/api/trucks')
				.set('Authorization', `Bearer ${token}`)
				.send({
					name: 'new truck',
					imageOfTruck: 'truck.jpg',
					cuisineType: 'sushi',
					currentLocation: 'Athens, GA',
					operatorId: 100001,
				});
		});

		it('should return 200', () => {
			expect(res.status).toBe(201);
		});

		it('should return a JSON object', () => {
			expect(res.type).toBe('application/json');
		});
	});

	describe('PUT /api/trucks/:id', () => {
		beforeAll(async () => {
			res = await request(server)
				.put('/api/trucks/100003')
				.set('Authorization', `Bearer ${token}`)
				.send({
					name: 'new truck name',
					imageOfTruck: 'truck.jpg',
					cuisineType: 'sushi',
					currentLocation: 'Athens, GA',
					operatorId: 100001,
				});
		});

		it('should return a JSON object', () => {
			expect(res.type).toBe('application/json');
		});

		it('should return a truck with the name new truck name', () => {
			expect(res.body.name).toBe('new truck name');
		});
	});

	describe('DELETE /api/trucks/:id', () => {
		beforeAll(async () => {
			res = await request(server)
				.delete('/api/trucks/100003')
				.set('Authorization', `Bearer ${token}`);
		});

		it('should return a JSON object', () => {
			expect(res.type).toBe('application/json');
		});

		it('should delete a truck', () => {
			expect(res.body).toEqual({ removed: 1 });
		});
	});
});
