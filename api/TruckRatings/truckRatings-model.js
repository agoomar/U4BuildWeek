/* eslint-disable no-useless-catch */
const db = require('../data/db-config');

async function add(customerRating) {
	try {
		const { truckId, dinerId } = customerRating;
		const rating = await findBy({ truckId, dinerId });

		if (rating) await remove(truckId, dinerId);

		await db('truckRatings').insert(customerRating);

		return await findByTruckId(truckId);
	} catch (error) {
		throw error;
	}
}

function findBy(filter) {
	return db('truckRatings').where(filter).first();
}

function findByTruckId(truckId) {
	return db('truckRatings').where({ truckId });
}

function remove(truckId, dinerId) {
	return db('truckRatings').where({ truckId, dinerId }).del();
}

module.exports = {
	add,
	findBy,
	findByTruckId,
	remove,
};
