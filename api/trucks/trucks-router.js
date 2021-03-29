const router = require('express').Router();

const restricted = require('../auth/restricted-middleware');

const Trucks = require('./trucks-model');
const Menus = require('../menus/menus-model');
const MenuItems = require('../MenuItems/menuItems-model');
const { validTruck } = require('./trucks-service');
const TruckRatings = require('../TruckRatings/truckRatings-model');
const MenuItemRatings = require('../MenuItemRatings/menuItemRatings-model');
const ItemPhotos = require('../ItemPhotos/itemPhotos-model');

/* ----- GET /api/trucks ----- */
router.get('/', restricted, (req, res) => {
	Trucks.find()
		.then((trucks) => {
			res.status(200).send(trucks);
		})
		.catch((err) => {
			res.send(err);
		});
});

/* ----- GET /api/trucks/:id ----- */
router.get('/:id', restricted, (req, res) => {
	const { id } = req.params;

	Trucks.findById(id)
		.then((truck) => {
			if (truck) {
				res.status(200).json(truck);
			} else {
				res.status(404).json({ message: 'Could not find truck with given id' });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: 'Failed to get truck' });
		});
});

/* ----- POST /api/trucks ----- */
router.post('/', restricted, (req, res) => {
	const truck = req.body;

	if (validTruck(truck)) {
		Trucks.add(truck)
			.then((truck) => {
				res.status(201).json(truck);
			})
			.catch((err) => {
				res.status(500).json({ message: err.message });
			});
	} else {
		res.status(400).json({
			message:
				'name, imageOfTruck, cuisineType, currentLocation, and operatorId are required to create a new truck',
		});
	}
});

/* ----- PUT /api/trucks/:id ----- */
router.put('/:id', restricted, (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	Trucks.findById(id)
		.then((truck) => {
			if (truck) {
				Trucks.update(changes, id).then((updatedTruck) => {
					res.json(updatedTruck);
				});
			} else {
				res.status(404).json({ message: 'Could not find truck with given id' });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: 'Failed to update truck' });
		});
});

/* ----- DELETE /api/trucks/:id ----- */
router.delete('/:id', restricted, (req, res) => {
	const { id } = req.params;

	Trucks.remove(id)
		.then((deleted) => {
			if (deleted) {
				res.json({ removed: deleted });
			} else {
				res.status(404).json({ message: 'Could not find truck with given id' });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: 'Failed to delete truck' });
		});
});

/* ----- GET /api/trucks/:id/menu ----- */
router.get('/:id/menu', restricted, (req, res) => {
	const { id } = req.params;

	Menus.findByTruckId(id)
		.then((menu) => {
			res.status(200).json(menu);
		})
		.catch((err) => {
			res.send(err);
		});
});

/* ----- POST /api/trucks/:id/menu ----- */
router.post('/:id/menu', restricted, (req, res) => {
	let menuItem = req.body;
	menuItem.menuId = req.params.id;

	MenuItems.add(menuItem)
		.then((menuItem) => {
			res.status(201).json(menuItem);
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

/* ----- PUT /api/trucks/:truckId/menu/:menuItemId ----- */
router.put('/:truckId/menu/:menuItemId', restricted, (req, res) => {
	const { menuItemId } = req.params;
	const changes = req.body;

	MenuItems.findById(menuItemId)
		.then((menuItem) => {
			if (menuItem) {
				MenuItems.update(changes, menuItemId).then((updatedMenuItem) => {
					res.json(updatedMenuItem);
				});
			} else {
				res
					.status(404)
					.json({ message: 'Could not find menuItem with the given id' });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: 'Failed to update menuItem ' });
		});
});

/* ----- DELETE /api/trucks/:truckId/menu/:menuItemId ----- */
router.delete('/:id/menu/:menuItemId', restricted, (req, res) => {
	const { menuItemId } = req.params;

	MenuItems.remove(menuItemId)
		.then((deleted) => {
			if (deleted) {
				res.json({ removed: deleted });
			} else {
				res.status(404).json({
					message: 'Could not find menuItem with given menuItemId / truckId',
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: 'Failed to delete menuItem',
			});
		});
});

/* ----- POST /api/trucks/:truckId/customerRatings/:dinerId ----- */
router.post('/:truckId/customerRatings/:dinerId', restricted, (req, res) => {
	const newRating = req.body;
	newRating.truckId = req.params.truckId;
	newRating.dinerId = req.params.dinerId;

	TruckRatings.add(newRating)
		.then((truckRatings) => {
			res.status(201).json(truckRatings);
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

/* ----- POST /api/trucks/:truckId/menu/:menuItemId/customerRatings/:dinerId ----- */
router.post(
	'/:truckId/menu/:menuItemId/customerRatings/:dinerId',
	restricted,
	(req, res) => {
		const newRating = req.body;
		newRating.menuItemId = req.params.menuItemId;
		newRating.dinerId = req.params.dinerId;

		MenuItemRatings.add(newRating)
			.then((menuItemRatings) => {
				res.status(201).json(menuItemRatings);
			})
			.catch((err) => {
				res.status(500).json({ message: err.message });
			});
	}
);

/* ----- POST /api/trucks/:truckId/menu/:menuItemId/itemPhotos ----- */
router.post('/:truckId/menu/:menuItemId/itemPhotos', restricted, (req, res) => {
	const { menuItemId } = req.params;
	const { url } = req.body;

	ItemPhotos.add(menuItemId, url)
		.then((itemPhotos) => {
			res.status(201).json(itemPhotos);
		})
		.catch((err) => {
			res.send(err);
		});
});

/* ----- DELETE /api/trucks/:truckId/menu/:menuItemId/itemPhotos ----- */
router.delete(
	'/:truckId/menu/:menuItemId/itemPhotos',
	restricted,
	(req, res) => {
		const { menuItemId } = req.params;
		const { url } = req.body;

		ItemPhotos.remove(menuItemId, url)
			.then((itemPhotos) => {
				res.json(itemPhotos);
			})
			.catch((err) => {
				res.send(err);
			});
	}
);

module.exports = router;
