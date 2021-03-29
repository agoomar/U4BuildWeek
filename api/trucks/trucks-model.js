const db = require('../data/db-config');
const Menus = require('../menus/menus-model');

async function add(truck) {
	const [id] = await db('trucks').insert(truck, 'id');

	await db('menus').insert({ truckId: id });

	return findById(id);
}

async function find() {
	const trucks = await db('trucks');

	for (const truck of trucks) {
		truck.menu = await Menus.findByTruckId(truck.id);

		truck.customerRatings = await addTruckRatings(truck.id);

		const { customerRatings } = truck;

		truck.customerRatingsAvg = Math.round(
			customerRatings.reduce((total, num) => total + num, 0) /
				customerRatings.length
		);
	}

	return trucks;
}

async function findById(id) {
	const truck = await db('trucks').where({ id }).first();

	if (!truck) return;

	truck.menu = await Menus.findByTruckId(id);

	truck.customerRatings = await addTruckRatings(id);

	const { customerRatings } = truck;

	truck.customerRatingsAvg = Math.round(
		customerRatings.reduce((total, num) => total + num, 0) /
			customerRatings.length
	);

	return truck;
}

function update(changes, id) {
	return db('trucks')
		.where({ id })
		.update(changes)
		.then((count) => {
			return findById(id);
		});
}

function remove(id) {
	return db('trucks').where({ id }).del();
}

async function addTruckRatings(id) {
	return (
		await db('truckRatings').where({ truckId: id }).select('customerRating')
	).map((item) => (item = item.customerRating));
}

module.exports = {
	add,
	find,
	findById,
	update,
	remove,
	addTruckRatings,
};
