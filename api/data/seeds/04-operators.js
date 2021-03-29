exports.seed = function (knex) {
	return knex('operators').insert([
		{ id: 101, userId: 103 },
		{ id: 102, userId: 104 },
	]);
};
