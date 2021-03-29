/* eslint-disable no-useless-catch */
const db = require('../data/db-config');

const Menus = require('../menus/menus-model');
const Trucks = require('../trucks/trucks-model');

function find() {
	return db('operators').join('users', 'operators.userId', '=', 'users.id');
}

function findById(id) {
	return db('operators')
		.join('users', 'operators.userId', '=', 'users.id')
		.where({ 'operators.id': id })
		.select('operators.id as operatorId', 'username', 'email')
		.first();
}

function findByUserId(userId) {
	return db('operators')
		.join('users', 'operators.userId', '=', 'users.id')
		.where({ 'operators.userId': userId })
		.select('operators.id as operatorId', 'username', 'email')
		.first();
}

async function findTrucksOwned(id) {
	try {
		const trucks = await db('trucks').where({ operatorId: id });

		for (const truck of trucks) {
			truck.menu = await Menus.findByTruckId(truck.id);

			truck.customerRatings = await Trucks.addTruckRatings(truck.id);

			const { customerRatings } = truck;

			truck.customerRatingsAvg = Math.round(
				customerRatings.reduce((total, num) => total + num, 0) /
					customerRatings.length
			);
		}

		return trucks;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	find,
	findById,
	findByUserId,
	findTrucksOwned,
};
