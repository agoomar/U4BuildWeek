/* eslint-disable no-useless-catch */
const db = require('../data/db-config');

async function add(menuItem) {
	try {
		const { itemPhotos } = menuItem;

		if (itemPhotos) {
			delete menuItem.itemPhotos;
		}

		const [id] = await db('menuItems').insert(menuItem, 'id');

		if (itemPhotos) {
			for (const photo of itemPhotos) {
				await db('itemPhotos').insert({
					menuItemId: id,
					url: photo,
				});
			}
		}

		return findById(id);
	} catch (error) {
		throw error;
	}
}

async function find() {
	try {
		const menuItems = await db('menuItems');

		for (const item of menuItems) {
			item.itemPhotos = await addItemPhotos(item.id);

			item.customerRatings = await addItemRatings(item.id);

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

async function findById(id) {
	try {
		const menuItem = await db('menuItems').where({ id }).first();

		if (!menuItem) return;

		menuItem.itemPhotos = await addItemPhotos(id);

		menuItem.customerRatings = await addItemRatings(id);

		const { customerRatings } = menuItem;

		menuItem.customerRatingsAvg = Math.round(
			customerRatings.reduce((total, num) => total + num, 0) /
				customerRatings.length
		);

		return menuItem;
	} catch (error) {
		throw error;
	}
}

function update(changes, id) {
	const { itemPhotos } = changes;

	if (itemPhotos) {
		delete changes.itemPhotos;
	}

	return db('menuItems')
		.where({ id })
		.update(changes)
		.then((count) => {
			return findById(id);
		});
}

async function remove(menuItemId) {
	try {
		return db('menuItems').where({ id: menuItemId }).del();
	} catch (error) {
		throw error;
	}
}

async function addItemPhotos(id) {
	return (await db('itemPhotos').where({ menuItemId: id }).select('url')).map(
		(photo) => (photo = photo.url)
	);
}

async function addItemRatings(id) {
	return (
		await db('menuItemRatings')
			.where({ menuItemId: id })
			.select('customerRating')
	).map((rating) => (rating = rating.customerRating));
}

module.exports = {
	add,
	find,
	findById,
	update,
	remove,
	addItemPhotos,
	addItemRatings,
};
