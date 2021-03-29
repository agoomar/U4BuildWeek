const router = require('express').Router();

const restricted = require('../auth/restricted-middleware');
const Operators = require('./operators-model');

// ---- GET /api/operators ----
router.get('/', restricted, (req, res) => {
	Operators.find()
		.then((operators) => {
			res.status(200).json(operators);
		})
		.catch((err) => {
			res.send(err);
		});
});

// ---- GET /api/operators:id ----
router.get('/:id', (req, res) => {
	const { id } = req.params;

	Operators.findById(id)
		.then(async (operator) => {
			operator.trucksOwned = await Operators.findTrucksOwned(id);
			res.status(200).json(operator);
		})
		.catch((err) => {
			res.send(err);
		});
});

// ---- GET /api/operators/:id/trucksOwned ----
router.get('/:id/trucksOwned', restricted, (req, res) => {
	const { id } = req.params;

	Operators.findTrucksOwned(id)
		.then((trucks) => {
			res.status(200).json(trucks);
		})
		.catch((err) => {
			res.send(err);
		});
});

module.exports = router;
