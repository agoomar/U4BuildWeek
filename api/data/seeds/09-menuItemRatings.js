exports.seed = function (knex) {
	return knex('menuItemRatings').insert([
		{ menuItemId: 101, dinerId: 101, customerRating: 1 },
		{ menuItemId: 102, dinerId: 101, customerRating: 2 },
		{ menuItemId: 103, dinerId: 102, customerRating: 3 },
		{ menuItemId: 104, dinerId: 102, customerRating: 4 },
	]);
};
