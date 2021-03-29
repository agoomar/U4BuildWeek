const Diners = require('./diners-model');

module.exports = (req, res, next) => {
	const { id } = req.params;

	Diners.findById(id).then((found) => {
		if (found) {
			next();
		} else {
			res.status(400).json({ message: 'Invalid diner id' });
		}
	});
};
