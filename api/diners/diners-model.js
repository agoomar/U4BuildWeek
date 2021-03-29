/* eslint-disable no-useless-catch */
const db = require('../data/db-config');

const Menus = require('../menus/menus-model');
const Trucks = require('../trucks/trucks-model');

function find() {
	return db('diners').join('users', 'diners.userId', '=', 'users.id');
}

function findById(id) {
	return db('diners')
		.join('users', 'diners.userId', '=', 'users.id')
		.where({ 'diners.id': id })
		.select(
			'diners.id as dinerId',
			'users.id as userId',
			'username',
			'email',
			'currentLocation'
		)
		.first();
}

function findByUserId(userId) {
	return db('diners')
		.join('users', 'diners.userId', '=', 'users.id')
		.where({ 'diners.userId': userId })
		.select('diners.id as dinerId', 'username', 'email', 'currentLocation')
		.first();
}

function updateLocation(newLocation, id) {
	return db('diners')
		.where({ id })
		.update({ currentLocation: newLocation })
		.then((count) => {
			return findById(id);
		});
}

async function findFavoriteTrucks(id) {
	try {
		const trucks = await db('trucks')
			.join('diners_trucks', 'trucks.id', '=', 'diners_trucks.truckId')
			.where({ 'diners_trucks.dinerId': id });

		for (const truck of trucks) {
			truck.menu = await Menus.findByTruckId(truck.id);
			truck.customerRatings = await Trucks.addTruckRatings(truck.id);

			const { customerRatings } = truck;

			truck.customerRatingsAvg = Math.round(
				customerRatings.reduce((total, num) => total + num, 0) /
					customerRatings.length
			);
		}

		return trucks;
	} catch (error) {
		throw error;
	}
}

function findTruckById(id) {
	return db('trucks').where({ id }).first();
}

async function addTruckToFavs(dinerId, truckId) {
	const favoriteTrucks = await findFavoriteTrucks(dinerId);
	const found = favoriteTrucks.filter((truck) => truck.id === truckId);

	if (found.length > 0) {
		return favoriteTrucks;
	} else {
		return db('diners_trucks')
			.insert({ dinerId, truckId })
			.then((res) => {
				return findFavoriteTrucks(dinerId);
			});
	}
}

async function removeTruckFromFavs(dinerId, truckId) {
	const favoriteTrucks = await findFavoriteTrucks(dinerId);
	const found = favoriteTrucks.filter((truck) => truck.id === truckId);

	if (found.length > 0) {
		return db('diners_trucks')
			.where({ dinerId, truckId })
			.del()
			.then((res) => {
				return findFavoriteTrucks(dinerId);
			});
	} else {
		return favoriteTrucks;
	}
}

module.exports = {
	find,
	findById,
	findByUserId,
	updateLocation,
	findFavoriteTrucks,
	findTruckById,
	addTruckToFavs,
	removeTruckFromFavs,
};
