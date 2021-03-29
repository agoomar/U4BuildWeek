exports.seed = function (knex) {
	return knex('diners_trucks').insert([
		{ dinerId: 101, truckId: 101 },
		{ dinerId: 101, truckId: 102 },
		{ dinerId: 102, truckId: 101 },
	]);
};
