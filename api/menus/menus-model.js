/* eslint-disable no-useless-catch */
const db = require('../data/db-config');

const MenuItems = require('../MenuItems/menuItems-model');

async function findById(id) {
	try {
		const menuItems = await db('menus')
			.join('menuItems', 'menus.id', '=', 'menuItems.menuId')
			.where({ 'menus.id': id })
			.select(
				'menuItems.id',
				'menuItems.itemName',
				'menuItems.itemDescription',
				'menuItems.itemPrice'
			)
			.orderBy('menuItems.id');

		for (const item of menuItems) {
			item.itemPhotos = await MenuItems.addItemPhotos(item.id);

			item.customerRatings = await MenuItems.addItemRatings(item.id);

			const { customerRatings } = item;

			item.customerRatingsAvg = Math.round(
				customerRatings.reduce((total, num) => total + num, 0) /
					customerRatings.length
			);
		}

		return menuItems;
	} catch (error) {
		throw error;
	}
}

async function findByTruckId(truckId) {
	try {
		const menuItems = await db('menus')
			.join('menuItems', 'menus.id', '=', 'menuItems.menuId')
			.where({ 'menus.truckId': truckId })
			.select(
				'menuItems.id',
				'menuItems.itemName',
				'menuItems.itemDescription',
				'menuItems.itemPrice'
			)
			.orderBy('menuItems.id');

		for (const item of menuItems) {
			item.itemPhotos = await MenuItems.addItemPhotos(item.id);

			item.customerRatings = await MenuItems.addItemRatings(item.id);

			const { customerRatings } = item;

			item.customerRatingsAvg = Math.round(
				customerRatings.reduce((total, num) => total + num, 0) /
					customerRatings.length
			);
		}

		return menuItems;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	findById,
	findByTruckId,
	// addMenuItem,
	// removeMenuItem
};
