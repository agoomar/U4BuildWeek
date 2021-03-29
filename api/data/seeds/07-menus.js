exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex('menus')
		.insert([
			{ id: 101, truckId: 101 },
			{ id: 102, truckId: 102 },
		])
		.then(function () {
			return knex('menuItems').insert([
				{
					id: 101,
					menuId: 101,
					itemName: 'hamburger',
					itemDescription: 'good hamburger',
					itemPrice: 5,
				},
				{
					id: 102,
					menuId: 101,
					itemName: 'cheeseburger',
					itemDescription: 'pretty good cheeseburger',
					itemPrice: 6,
				},
				{
					id: 103,
					menuId: 102,
					itemName: 'pulled pork',
					itemDescription: 'yummy sauce',
					itemPrice: 7,
				},
				{
					id: 104,
					menuId: 102,
					itemName: 'ribs',
					itemDescription: 'full rack of deliciousness',
					itemPrice: 10,
				},
			]);
		})
		.then(function () {
			return knex('itemPhotos').insert([
				{
					id: 101,
					menuItemId: 101,
					url: 'hamburger.jpg',
				},
				{
					id: 102,
					menuItemId: 102,
					url: 'cheeseburger.jpg',
				},
				{
					id: 103,
					menuItemId: 103,
					url: 'pulledPork.jpg',
				},
				{
					id: 104,
					menuItemId: 104,
					url: 'ribs.jpg',
				},
				{
					id: 105,
					menuItemId: 101,
					url: 'hamburger2.jpg',
				},
			]);
		});
};
