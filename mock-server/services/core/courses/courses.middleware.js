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

		if (courses.length < to) {
			to = courses.length;
		}

		const totalPages = Math.round(courses.length / query.count);

		courses = courses.slice(from, to);

		res.json({
			courses: courses,
			totalPages: totalPages
		});
	});

	return router;
};
