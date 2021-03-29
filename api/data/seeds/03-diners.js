exports.seed = function (knex) {
	return knex('diners').insert([
		{ id: 101, userId: 101 },
		{ id: 102, userId: 102 },
	]);
};
