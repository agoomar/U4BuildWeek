const Trucks = require('./trucks-model');

function validTruck(truck) {
	return Boolean(
		truck.name &&
			truck.imageOfTruck &&
			truck.cuisineType &&
			truck.currentLocation &&
			truck.operatorId
	);
}

module.exports = {
	validTruck,
};
