var app = require('./app');
require('dotenv').config();

const port = process.env.PORT;

var server = app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
