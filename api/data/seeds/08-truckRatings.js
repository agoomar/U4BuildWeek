exports.seed = function (knex) {
	return knex('truckRatings').insert([
		{ truckId: 101, dinerId: 101, customerRating: 1 },
		{ truckId: 102, dinerId: 101, customerRating: 2 },
		{ truckId: 101, dinerId: 102, customerRating: 3 },
		{ truckId: 102, dinerId: 102, customerRating: 4 },
	]);
};
