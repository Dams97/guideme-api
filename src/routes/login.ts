import { FastifyInstance } from 'fastify';
import * as bcrypt from 'bcrypt';

//const jwt = require('jsonwebtoken');


export default async function (server: FastifyInstance) {
	server.get('/login', async (request, reply) => {
		return 'hi';
	});

	server.get('/verify', async (request, reply) => {
		return 'hi';
	});
}
