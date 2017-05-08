const express = require('express');
const router = express.Router();
const url = require('url');

const findAuthors = (serverAuthors, authorsIds) => {
	let authors = [];

	authorsIds.map((id) => {
		const author = serverAuthors.find((serverAuthor) => serverAuthor.id === id);

		if (author) {
			authors.push(author);
		}
	});

	return authors;
};

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

	router.get('/courses/:id', (req, res, next) => {
		let id = req.params.id,
			courses = server.db.getState().courses;

		const course = courses.find((course) => course.id == id);

		if (course) {
			res.json(course);
		} else {
			res.status(404).send('Wrong id');
		}
	});

	router.post('/courses/:id', (req, res, next) => {
		let course = req.body,
			id = req.params.id,
			date = course.createDate.split('/'),
			courses = server.db.getState().courses,
			authors = server.db.getState().authors;

		const courseToUpdate = courses.find((course) => course.id == id);

		if (courseToUpdate) {
			courseToUpdate.name = course.title;
			courseToUpdate.description = course.description;
			courseToUpdate.date = new Date(date[2], date[1] - 1, date[0]);
			courseToUpdate.authors = findAuthors(authors, course.authors);
			courseToUpdate.length = course.duration;

			res.json('OK');
		} else {
			res.status(404).send('Wrong id');
		}
	});

	router.delete('/courses/:id', (req, res, next) => {
		let id = req.params.id,
			courses = server.db.getState().courses;

		const deletedIndex = courses.findIndex((course) => course.id == id);

		if (deletedIndex > -1) {
			courses.splice(deletedIndex, 1);
			res.json('OK');
		} else {
			res.status(404).send('Wrong id');
		}
	});

	return router;
};
