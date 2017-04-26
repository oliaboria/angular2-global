const express = require('express');
const router = express.Router();
const url = require('url');

module.exports = (server) => {

	router.get('/courses', (req, res, next) => {
		let url_parts = url.parse(req.originalUrl, true),
			query = url_parts.query,
			from = query.start,
			to = +query.start + +query.count,
			sort = query.sort,
			queryStr = query.query,
			courses = server.db.getState().courses;

		console.log('Query:', queryStr);

		if (courses.length < to) {
			to = courses.length;
		}

		courses = courses.slice(from, to);

		res.json(courses);
	});

	router.delete('/courses/:id', (req, res, next) => {
		let id = req.params.id,
			courses = server.db.getState().courses;

		const deletedIndex = courses.findIndex((course) => course.id == id);

		if (deletedIndex > -1) {
			courses.splice(deletedIndex, 1);
			res.json('OK')
		} else {
			res.status(404).send('Wrong id');
		}
	});

	return router;
};
