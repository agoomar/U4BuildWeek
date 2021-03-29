if (!process.env.JWT_SECRET) {
	console.log('no process.env.JWT_SECRET set');
}

module.exports = {
	jwtSecret: process.env.JWT_SECRET,
};
