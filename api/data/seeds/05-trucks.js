exports.seed = function (knex) {
	return knex('trucks').insert([
		{
			id: 101,
			name: 'truck1',
			imageOfTruck: 'truck.jpg',
			cuisineType: 'thai',
			operatorId: 101,
			currentLocation: '41.881832, -87.623177',
		},
		{
			id: 102,
			name: 'truck2',
			imageOfTruck: 'truck.jpg',
			cuisineType: 'bbq',
			operatorId: 102,
			currentLocation: '30.505198, -97.820290',
		},
	]);
};
